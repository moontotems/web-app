// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";

import "./common/meta-transactions/ContentMixin.sol";
import "./common/meta-transactions/NativeMetaTransaction.sol";

contract OwnableDelegateProxy {}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

/**
 * @title ERC721Tradable
 * ERC721Tradable - ERC721 contract that whitelists a trading address, and has minting functionality.
 */
abstract contract ERC721Tradable is ContextMixin, ERC721Enumerable, NativeMetaTransaction, Ownable {
    using SafeMath for uint256;

    address proxyRegistryAddress;

    /**
     * @dev The smallest valid token id.
     */
    uint256 public constant MIN_TOKEN_ID = 0;

    /**
     * @dev The largest valid token id.
     */
    uint256 public constant MAX_TOKEN_ID = 9457;

    /**
     * @dev Whether minting is allowed.
     */
    bool public MINT_IS_ACTIVE = false;

    /**
     * @dev The price for minting a totem.
     */
    uint256 public TOTEM_MINT_PRICE = 50000000000000000; // 0.05 ETH


    constructor(
        string memory _name,
        string memory _symbol,
        address _proxyRegistryAddress
    ) ERC721(_name, _symbol) {
        proxyRegistryAddress = _proxyRegistryAddress;
        _initializeEIP712(_name);
    }

    /**
     * @dev Emits when a NFTs is minted.
     */
    event Mint(address indexed _to, uint256 indexed _tokenId);

    /**
     * @dev Emits when TOTEM_MINT_PRICE is updated.
     */
    event TotemMintPriceUpdate(address indexed _by, uint256 indexed _amount);

    /**
     * @dev Emits when MINT_IS_ACTIVE is updated.
     */
    event MintFlagUpdate(address indexed _by, bool indexed _active);

    /**
     * @dev Requirements that have to be met for minting to work.
     * @param _tokenId ID of the NFT to mint.
     */
    modifier canMint(
        uint256 _tokenId
    )
    {
        require(MINT_IS_ACTIVE, "Minting is not active");
        require(_tokenId >= MIN_TOKEN_ID, "TokenId needs to be >= MIN_TOKEN_ID");
        require(_tokenId <= MAX_TOKEN_ID, "TokenId needs to be <= MAX_TOKEN_ID");
        require(msg.value == TOTEM_MINT_PRICE, "Amount needs to be equal to TOTEM_MINT_PRICE");
        _;
    }

    /**
     * @dev Mints a new NFT.
     * @param _to The address that will own the minted NFT.
     * @param _tokenId The tokenId of the NFT to be minted by the msg.sender.

    function mintTo(address _to) public onlyOwner {
        uint256 newTokenId = _getNextTokenId();
        _mint(_to, newTokenId);
        _incrementTokenId();
    }
    */

    /**
     * @dev Mints a new NFT.
     * @param _to The address that will own the minted NFT.
     * @param _tokenId The tokenId of the NFT to be minted by the msg.sender.
     */
    function mint(
        address _to,
        uint256 _tokenId
    )
        external
        payable
        canMint(_tokenId)
    {
        super._mint(_to, _tokenId);
        emit Mint(msg.sender, _tokenId);
    }

    /**
     * @dev Updates the price for minting a totem.
     * @param _totemMintPrice The new price in wei.
     */
    function setNewMintPrice(
        uint256 _totemMintPrice
    )
        external
        onlyOwner
    {
        TOTEM_MINT_PRICE = _totemMintPrice;
        emit TotemMintPriceUpdate(msg.sender, _totemMintPrice);
    }

    /**
     * @dev Toggle whether minting is allowed.
     */
    function flipMintFlag()
        external
        onlyOwner
    {
        MINT_IS_ACTIVE = !MINT_IS_ACTIVE;
        emit MintFlagUpdate(msg.sender, MINT_IS_ACTIVE);
    }

    function baseTokenURI() virtual public view returns (string memory);

    function tokenURI(uint256 _tokenId)
        override
        public
        view
        returns (string memory)
    {
        return string(abi.encodePacked(baseTokenURI(), Strings.toString(_tokenId)));
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        override
        public
        view
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender()
        internal
        override
        view
        returns (address sender)
    {
        return ContextMixin.msgSender();
    }
}
