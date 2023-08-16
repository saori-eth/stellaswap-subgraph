import { ethereum, Bytes, BigInt, ByteArray } from "@graphprotocol/graph-ts"
import { log } from "matchstick-as"
import {
  AuctionBid_Displaced as AuctionBid_DisplacedEvent,
  AuctionBid_Placed as AuctionBid_PlacedEvent,
  AuctionRegistration_EndTimeUpdated as AuctionRegistration_EndTimeUpdatedEvent,
  AuctionRegistration_NewAuction as AuctionRegistration_NewAuctionEvent,
  Auction_Claimed as Auction_ClaimedEvent,
  Currency_AddressUpdated as Currency_AddressUpdatedEvent,
  Currency_DefaultUpdated as Currency_DefaultUpdatedEvent,
  Currency_NameUpdated as Currency_NameUpdatedEvent,
  Diamond,
  GBMPreset_DefaultUpdated as GBMPreset_DefaultUpdatedEvent,
  GBMPreset_Updated as GBMPreset_UpdatedEvent,
  SaleExecuted as SaleExecutedEvent,
  SaleRegistration_NewSale as SaleRegistration_NewSaleEvent
} from "../generated/Diamond/Diamond"
import {
  Auction,
  AuctionBid_Displaced,
  AuctionBid_Placed,
  AuctionRegistration_EndTimeUpdated,
  AuctionRegistration_NewAuction,
  Auction_Claimed,
  Bid,
  Currency_AddressUpdated,
  Currency_DefaultUpdated,
  Currency_NameUpdated,
  GBMPreset_DefaultUpdated,
  GBMPreset_Updated,
  Project,
  SaleExecuted,
  SaleRegistration_NewSale
} from "../generated/schema"
import { ERC721 } from "../generated/ERC721/ERC721"

export function handleAuctionBid_Displaced(
  event: AuctionBid_DisplacedEvent
): void {
  let entity = new AuctionBid_Displaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.saleID = event.params.saleID
  entity.bidIndex = event.params.bidIndex
  entity.bidder = event.params.bidder
  entity.bidamount = event.params.bidamount
  entity.incentivesPaid = event.params.incentivesPaid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionBid_Placed(event: AuctionBid_PlacedEvent): void {

  //ENTITY (EVENT ) OBJECT

  let entity = new AuctionBid_Placed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.saleID = event.params.saleID
  entity.bidIndex = event.params.bidIndex
  entity.bidder = event.params.bidder
  entity.bidamount = event.params.bidamount
  entity.incentivesDue = event.params.incentivesDue
  entity.bidTimestamp = event.params.bidTimestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  //create a new bid and auction object
  //saleID int -> hex string > padded with 0 in case it's not an even length
  //(requirement by subgraph)
  let saleID = event.params.saleID.toU32()
  let padded = saleID.toString(16).padStart(2,'0');

  //load up auction object for later use

  const auction = Auction.load(Bytes.fromHexString(padded));

  //BID OBJECT
  
 
  const bid = new Bid( event.transaction.hash.concatI32(event.logIndex.toI32()));
  bid.auction = Bytes.fromHexString(padded);
  bid.saleID = event.params.saleID
  bid.bidIndex = event.params.bidIndex
  bid.bidder = event.params.bidder
  bid.bidamount = event.params.bidamount
  bid.incentivesDue = event.params.incentivesDue
  bid.bidTimestamp = event.params.bidTimestamp

  bid.blockNumber = event.block.number
  bid.blockTimestamp = event.block.timestamp
  bid.transactionHash = event.transaction.hash


  


  // Load auction related to this bid and load up the 
  if(auction) {
    //save current bid pointer to auction
    auction.currentBid = bid.id;
    auction.save()

    bid.price = bid.bidamount.div(auction.tokenID);

    //calculate price
    //get the bundle size by loading the auction and fetching tokenID == bundle size
    bid.save()
  

  }
  

  

}

export function handleAuctionRegistration_EndTimeUpdated(
  event: AuctionRegistration_EndTimeUpdatedEvent
): void {
  let entity = new AuctionRegistration_EndTimeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.saleID = event.params.saleID
  entity.endTimeStamp = event.params.endTimeStamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionRegistration_NewAuction(
  event: AuctionRegistration_NewAuctionEvent
): void {
  let entity = new AuctionRegistration_NewAuction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.saleID = event.params.saleID
  entity.tokenContractAddress = event.params.tokenContractAddress
  entity.tokenID = event.params.tokenID
  entity.tokenAmount = event.params.tokenAmount
  entity.tokenKind = event.params.tokenKind
  entity.gbmPresetIndex = event.params.gbmPresetIndex
  entity.currencyID = event.params.currencyID
  entity.startTimestamp = event.params.startTimestamp
  entity.endTimeStamp = event.params.endTimeStamp
  entity.beneficiary = event.params.beneficiary
  entity.startingBid = event.params.startingBid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  //create a new project object
  //add auction under it
  let project = new Project(event.params.tokenContractAddress);
  //get IPFS url
  //let contract = ERC721.bind(event.params.tokenContractAddress);
  //let tokenURI = contract.tokenURI(BigInt.fromString("0"));
  //log.info("tokenURI: {}",[tokenURI]);
  project.ipfs = event.params.tokenContractAddress
  project.save()

  let saleID = event.params.saleID.toU32()
  let padded = saleID.toString(16).padStart(2,'0');

  let auction = new Auction(Bytes.fromHexString(padded))
  auction.project = project.id;
  // auction.saleID = event.params.saleID
  auction.tokenContractAddress = event.params.tokenContractAddress
  auction.tokenID = event.params.tokenID
  auction.tokenAmount = event.params.tokenAmount
  auction.tokenKind = event.params.tokenKind
  auction.gbmPresetIndex = event.params.gbmPresetIndex
  auction.currencyID = event.params.currencyID
  auction.startTimestamp = event.params.startTimestamp
  auction.endTimeStamp = event.params.endTimeStamp
  auction.beneficiary = event.params.beneficiary
  auction.startingBid = event.params.startingBid

  auction.blockNumber = event.block.number
  auction.blockTimestamp = event.block.timestamp
  auction.transactionHash = event.transaction.hash



  auction.save()
}

export function handleAuction_Claimed(event: Auction_ClaimedEvent): void {
  let entity = new Auction_Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.saleID = event.params.saleID
  entity.tokenContractAddress = event.params.tokenContractAddress
  entity.tokenID = event.params.tokenID
  entity.tokenAmount = event.params.tokenAmount
  entity.tokenKind = event.params.tokenKind
  entity.beneficiary = event.params.beneficiary
  entity.winningBidAmount = event.params.winningBidAmount
  entity.winningBidCurrencyIndex = event.params.winningBidCurrencyIndex
  entity.winner = event.params.winner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCurrency_AddressUpdated(
  event: Currency_AddressUpdatedEvent
): void {
  let entity = new Currency_AddressUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.currencyIndex = event.params.currencyIndex
  entity.currencyAddress = event.params.currencyAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCurrency_DefaultUpdated(
  event: Currency_DefaultUpdatedEvent
): void {
  let entity = new Currency_DefaultUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.currencyIndex = event.params.currencyIndex
  entity.currencyAddress = event.params.currencyAddress
  entity.currencyName = event.params.currencyName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCurrency_NameUpdated(
  event: Currency_NameUpdatedEvent
): void {
  let entity = new Currency_NameUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.currencyIndex = event.params.currencyIndex
  entity.currencyName = event.params.currencyName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGBMPreset_DefaultUpdated(
  event: GBMPreset_DefaultUpdatedEvent
): void {
  let entity = new GBMPreset_DefaultUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.presetID = event.params.presetID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGBMPreset_Updated(event: GBMPreset_UpdatedEvent): void {
  let entity = new GBMPreset_Updated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.presetID = event.params.presetID
  entity.auctionDuration = event.params.auctionDuration
  entity.hammerTimeDuration = event.params.hammerTimeDuration
  entity.cancellationPeriodDuration = event.params.cancellationPeriodDuration
  entity.stepMin = event.params.stepMin
  entity.incentiveMin = event.params.incentiveMin
  entity.incentiveMax = event.params.incentiveMax
  entity.incentiveGrowthMultiplier = event.params.incentiveGrowthMultiplier
  entity.firstMinBid = event.params.firstMinBid
  entity.presetName = event.params.presetName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSaleExecuted(event: SaleExecutedEvent): void {
  let entity = new SaleExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.saleID = event.params.saleID
  entity.tokenContractAddress = event.params.tokenContractAddress
  entity.tokenID = event.params.tokenID
  entity.tokenAmount = event.params.tokenAmount
  entity.price = event.params.price
  entity.leftoverTokens = event.params.leftoverTokens
  entity.leftoverPrice = event.params.leftoverPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSaleRegistration_NewSale(
  event: SaleRegistration_NewSaleEvent
): void {
  let entity = new SaleRegistration_NewSale(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.saleID = event.params.saleID
  entity.tokenContractAddress = event.params.tokenContractAddress
  entity.tokenID = event.params.tokenID
  entity.tokenAmount = event.params.tokenAmount
  entity.tokenKind = event.params.tokenKind
  entity.tokenOrigin = event.params.tokenOrigin
  entity.price = event.params.price
  entity.currencyID = event.params.currencyID
  entity.beneficiary = event.params.beneficiary
  entity.startTimestamp = event.params.startTimestamp
  entity.endTimestamp = event.params.endTimestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
