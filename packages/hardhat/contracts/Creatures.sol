// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Moons
 * Moons - a contract for my non-fungible Moons.
 */
contract Creatures is ERC721Tradable {
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _nftBaseUri,
        address _proxyRegistryAddress
    )
        ERC721Tradable(_name, _symbol, _proxyRegistryAddress)
    {
        _setBaseUri(_nftBaseUri);
    }

    /**
     * @dev A prefix for all token uris.
     */
    string internal nftBaseUri;

    string internal nftContractUri;

    /**
     * @dev Set base URI for computing {tokenURI}.
     * @param _baseUri The new baseUri.
     */
    function setBaseUri(string memory _baseUri) external onlyOwner {
        _setBaseUri(_baseUri);
    }

    /**
     * @dev Withdraw contract balance to contract owner.
     */
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function baseTokenURI() override public view returns (string memory) {
        return nftBaseUri;
    }

    function setContractUri(string memory _baseUri) external onlyOwner {
      _setBaseUri(_baseUri);
    }

    function contractURI() public view returns (string memory) {
        //return "https://creatures-api.opensea.io/contract/opensea-creatures";
        return nftContractUri;
    }

    /**
     * @notice This is an internal function which should be called from user-implemented external
     * function. Its purpose is to show and properly initialize data structures when using this
     * implementation.
     * @dev Set a new URI base.
     * @param _baseUri String representing the new URI base.
     */
    function _setBaseUri(string memory _baseUri) internal {
        nftBaseUri = _baseUri;
    }

    function _setContractURI(string memory _contractUri) internal {
        nftContractUri = _contractUri;
    }
}
