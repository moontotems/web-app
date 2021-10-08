// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "../tokens/nf-token-metadata.sol";
import "../tokens/nf-token-enumerable.sol";
import "../ownership/ownable.sol";

/**
 * @dev This is an example contract implementation of NFToken with enumerable and metadata
 * extensions.
 */
contract Moons is
  NFTokenEnumerable,
  NFTokenMetadata,
  Ownable
{
  /**
   * @dev The smallest valid token id.
   */
  uint256 public constant MIN_TOKEN_ID = 0;

  /**
   * @dev The largest valid token id.
   */
  uint256 public MAX_TOKEN_ID = 9457;

  /**
   * @dev Contract constructor.
   * @param _name A descriptive name for a collection of NFTs.
   * @param _symbol An abbreviated name for NFTokens.
   * @param _nftBaseUri A base prefix for all token uris.
   */
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _nftBaseUri
  )
  {
    nftName = _name;
    nftSymbol = _symbol;
    nftBaseUri = _nftBaseUri;
  }

  /**
   * @dev Emits when a NFTs is minted.
   */
  event Mint(address indexed _to, uint256 indexed _tokenId);

  /**
   * @dev Emits when a MAX_TOKEN_ID is increased.
   */
  event MaxTokenIdIncrease(address indexed _by, uint256 indexed _amount);

  /**
   * @dev Mints a new NFT.
   * @param _to The address that will own the minted NFT.
   * @param _tokenId of the NFT to be minted by the msg.sender.
   */
  function mint(
    address _to,
    uint256 _tokenId
  )
    external
    payable
  {
    require(_tokenId >= MIN_TOKEN_ID, "TokenId needs to be >= MIN_TOKEN_ID");
    require(_tokenId <= MAX_TOKEN_ID, "TokenId needs to be <= MAX_TOKEN_ID");
    require(msg.value == 0.1 ether, "Amount needs to be equal to 0.1 Ether");
    _transferEther(owner);
    super._mint(_to, _tokenId);
    emit Mint(msg.sender, _tokenId);
  }

  /**
   * @dev Removes a NFT from owner.
   * @param _tokenId Which NFT we want to remove.
   */
  function burn(
    uint256 _tokenId
  )
    external
    onlyOwner
  {
    super._burn(_tokenId);
  }

   /**
   * @dev Set base URI for computing {tokenURI}.
   * @param _baseUri The new BaseUri.
   */
  function setBaseUri(
    string memory _baseUri
  )
    external
    onlyOwner
  {
    super._setBaseUri(_baseUri);
  }

  /**
   * @dev Increase largest valid token id.
   * @param _amount The amount by which MAX_TOKEN_ID should be increased.
   */
  function increaseMaxTokenId(
    uint256 _amount
  )
    external
    onlyOwner
  {
    MAX_TOKEN_ID += _amount;
    emit MaxTokenIdIncrease(msg.sender, _amount);
  }

  /**
   * @dev Mints a new NFT.
   * @notice This is an internal function which should be called from user-implemented external
   * mint function. Its purpose is to show and properly initialize data structures when using this
   * implementation.
   * @param _to The address that will own the minted NFT.
   * @param _tokenId of the NFT to be minted by the msg.sender.
   */
  function _mint(
    address _to,
    uint256 _tokenId
  )
    internal
    override(NFToken, NFTokenEnumerable)
    virtual
  {
    NFTokenEnumerable._mint(_to, _tokenId);
  }

  /**
   * @dev Burns a NFT.
   * @notice This is an internal function which should be called from user-implemented external
   * burn function. Its purpose is to show and properly initialize data structures when using this
   * implementation. Also, note that this burn implementation allows the minter to re-mint a burned
   * NFT.
   * @param _tokenId ID of the NFT to be burned.
   */
  function _burn(
    uint256 _tokenId
  )
    internal
    override(NFTokenMetadata, NFTokenEnumerable)
    virtual
  {
    NFTokenEnumerable._burn(_tokenId);
  }

  /**
   * @notice Use and override this function with caution. Wrong usage can have serious consequences.
   * @dev Removes a NFT from an address.
   * @param _from Address from wich we want to remove the NFT.
   * @param _tokenId Which NFT we want to remove.
   */
  function _removeNFToken(
    address _from,
    uint256 _tokenId
  )
    internal
    override(NFToken, NFTokenEnumerable)
  {
    NFTokenEnumerable._removeNFToken(_from, _tokenId);
  }

  /**
   * @notice Use and override this function with caution. Wrong usage can have serious consequences.
   * @dev Assigns a new NFT to an address.
   * @param _to Address to wich we want to add the NFT.
   * @param _tokenId Which NFT we want to add.
   */
  function _addNFToken(
    address _to,
    uint256 _tokenId
  )
    internal
    override(NFToken, NFTokenEnumerable)
  {
    NFTokenEnumerable._addNFToken(_to, _tokenId);
  }

   /**
   * @dev Helper function that gets NFT count of owner. This is needed for overriding in enumerable
   * extension to remove double storage(gas optimization) of owner nft count.
   * @param _owner Address for whom to query the count.
   * @return Number of _owner NFTs.
   */
  function _getOwnerNFTCount(
    address _owner
  )
    internal
    override(NFToken, NFTokenEnumerable)
    view
    returns (uint256)
  {
    return NFTokenEnumerable._getOwnerNFTCount(_owner);
  }

  /**
   * @dev Transfers ether (msg.value) to the passed address.
   * @notice This is an internal function which should be called from user-implemented function.
   * @param _to The address to which to transfer the ether.
   */
  function _transferEther(address _to) internal {
    (bool sent, bytes memory data) = _to.call{value: msg.value}("");
    require(sent, "Failed to send Ether");
  }

}
