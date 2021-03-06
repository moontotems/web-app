// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "../tokens/nf-token-metadata.sol";
import "../ownership/ownable.sol";

/**
 * @dev This is an example contract implementation of NFToken with metadata extension.
 */
contract NFTokenMetadataMock is
  NFTokenMetadata,
  Ownable
{

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
   * @dev Mints a new NFT.
   * @param _to The address that will own the minted NFT.
   * @param _tokenId of the NFT to be minted by the msg.sender.
   */
  function mint(
    address _to,
    uint256 _tokenId
  )
    external
    onlyOwner
  {
    super._mint(_to, _tokenId);
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

}
