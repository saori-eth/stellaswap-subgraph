import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  AuctionBid_Displaced,
  AuctionBid_Placed,
  AuctionRegistration_EndTimeUpdated,
  AuctionRegistration_NewAuction,
  Auction_Claimed,
  Currency_AddressUpdated,
  Currency_DefaultUpdated,
  Currency_NameUpdated,
  GBMPreset_DefaultUpdated,
  GBMPreset_Updated,
  SaleExecuted,
  SaleRegistration_NewSale
} from "../generated/Diamond/Diamond"

export function createAuctionBid_DisplacedEvent(
  saleID: BigInt,
  bidIndex: BigInt,
  bidder: Address,
  bidamount: BigInt,
  incentivesPaid: BigInt
): AuctionBid_Displaced {
  let auctionBidDisplacedEvent = changetype<AuctionBid_Displaced>(
    newMockEvent()
  )

  auctionBidDisplacedEvent.parameters = new Array()

  auctionBidDisplacedEvent.parameters.push(
    new ethereum.EventParam("saleID", ethereum.Value.fromUnsignedBigInt(saleID))
  )
  auctionBidDisplacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidIndex",
      ethereum.Value.fromUnsignedBigInt(bidIndex)
    )
  )
  auctionBidDisplacedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  auctionBidDisplacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidamount",
      ethereum.Value.fromUnsignedBigInt(bidamount)
    )
  )
  auctionBidDisplacedEvent.parameters.push(
    new ethereum.EventParam(
      "incentivesPaid",
      ethereum.Value.fromUnsignedBigInt(incentivesPaid)
    )
  )

  return auctionBidDisplacedEvent
}

export function createAuctionBid_PlacedEvent(
  saleID: BigInt,
  bidIndex: BigInt,
  bidder: Address,
  bidamount: BigInt,
  incentivesDue: BigInt,
  bidTimestamp: BigInt
): AuctionBid_Placed {
  let auctionBidPlacedEvent = changetype<AuctionBid_Placed>(newMockEvent())

  auctionBidPlacedEvent.parameters = new Array()

  auctionBidPlacedEvent.parameters.push(
    new ethereum.EventParam("saleID", ethereum.Value.fromUnsignedBigInt(saleID))
  )
  auctionBidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidIndex",
      ethereum.Value.fromUnsignedBigInt(bidIndex)
    )
  )
  auctionBidPlacedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  auctionBidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidamount",
      ethereum.Value.fromUnsignedBigInt(bidamount)
    )
  )
  auctionBidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "incentivesDue",
      ethereum.Value.fromUnsignedBigInt(incentivesDue)
    )
  )
  auctionBidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidTimestamp",
      ethereum.Value.fromUnsignedBigInt(bidTimestamp)
    )
  )

  return auctionBidPlacedEvent
}

export function createAuctionRegistration_EndTimeUpdatedEvent(
  saleID: BigInt,
  endTimeStamp: BigInt
): AuctionRegistration_EndTimeUpdated {
  let auctionRegistrationEndTimeUpdatedEvent = changetype<
    AuctionRegistration_EndTimeUpdated
  >(newMockEvent())

  auctionRegistrationEndTimeUpdatedEvent.parameters = new Array()

  auctionRegistrationEndTimeUpdatedEvent.parameters.push(
    new ethereum.EventParam("saleID", ethereum.Value.fromUnsignedBigInt(saleID))
  )
  auctionRegistrationEndTimeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTimeStamp",
      ethereum.Value.fromUnsignedBigInt(endTimeStamp)
    )
  )

  return auctionRegistrationEndTimeUpdatedEvent
}

export function createAuctionRegistration_NewAuctionEvent(
  saleID: BigInt,
  tokenContractAddress: Address,
  tokenID: BigInt,
  tokenAmount: BigInt,
  tokenKind: Bytes,
  gbmPresetIndex: BigInt,
  currencyID: BigInt,
  startTimestamp: BigInt,
  endTimeStamp: BigInt,
  beneficiary: Address,
  startingBid: BigInt
): AuctionRegistration_NewAuction {
  let auctionRegistrationNewAuctionEvent = changetype<
    AuctionRegistration_NewAuction
  >(newMockEvent())

  auctionRegistrationNewAuctionEvent.parameters = new Array()

  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam("saleID", ethereum.Value.fromUnsignedBigInt(saleID))
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContractAddress",
      ethereum.Value.fromAddress(tokenContractAddress)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAmount",
      ethereum.Value.fromUnsignedBigInt(tokenAmount)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "tokenKind",
      ethereum.Value.fromFixedBytes(tokenKind)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "gbmPresetIndex",
      ethereum.Value.fromUnsignedBigInt(gbmPresetIndex)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "currencyID",
      ethereum.Value.fromUnsignedBigInt(currencyID)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "startTimestamp",
      ethereum.Value.fromUnsignedBigInt(startTimestamp)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "endTimeStamp",
      ethereum.Value.fromUnsignedBigInt(endTimeStamp)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  auctionRegistrationNewAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "startingBid",
      ethereum.Value.fromUnsignedBigInt(startingBid)
    )
  )

  return auctionRegistrationNewAuctionEvent
}

export function createAuction_ClaimedEvent(
  saleID: BigInt,
  tokenContractAddress: Address,
  tokenID: BigInt,
  tokenAmount: BigInt,
  tokenKind: Bytes,
  beneficiary: Address,
  winningBidAmount: BigInt,
  winningBidCurrencyIndex: BigInt,
  winner: Address
): Auction_Claimed {
  let auctionClaimedEvent = changetype<Auction_Claimed>(newMockEvent())

  auctionClaimedEvent.parameters = new Array()

  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam("saleID", ethereum.Value.fromUnsignedBigInt(saleID))
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContractAddress",
      ethereum.Value.fromAddress(tokenContractAddress)
    )
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAmount",
      ethereum.Value.fromUnsignedBigInt(tokenAmount)
    )
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenKind",
      ethereum.Value.fromFixedBytes(tokenKind)
    )
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "winningBidAmount",
      ethereum.Value.fromUnsignedBigInt(winningBidAmount)
    )
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "winningBidCurrencyIndex",
      ethereum.Value.fromUnsignedBigInt(winningBidCurrencyIndex)
    )
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return auctionClaimedEvent
}

export function createCurrency_AddressUpdatedEvent(
  currencyIndex: BigInt,
  currencyAddress: Address
): Currency_AddressUpdated {
  let currencyAddressUpdatedEvent = changetype<Currency_AddressUpdated>(
    newMockEvent()
  )

  currencyAddressUpdatedEvent.parameters = new Array()

  currencyAddressUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "currencyIndex",
      ethereum.Value.fromUnsignedBigInt(currencyIndex)
    )
  )
  currencyAddressUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "currencyAddress",
      ethereum.Value.fromAddress(currencyAddress)
    )
  )

  return currencyAddressUpdatedEvent
}

export function createCurrency_DefaultUpdatedEvent(
  currencyIndex: BigInt,
  currencyAddress: Address,
  currencyName: string
): Currency_DefaultUpdated {
  let currencyDefaultUpdatedEvent = changetype<Currency_DefaultUpdated>(
    newMockEvent()
  )

  currencyDefaultUpdatedEvent.parameters = new Array()

  currencyDefaultUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "currencyIndex",
      ethereum.Value.fromUnsignedBigInt(currencyIndex)
    )
  )
  currencyDefaultUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "currencyAddress",
      ethereum.Value.fromAddress(currencyAddress)
    )
  )
  currencyDefaultUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "currencyName",
      ethereum.Value.fromString(currencyName)
    )
  )

  return currencyDefaultUpdatedEvent
}

export function createCurrency_NameUpdatedEvent(
  currencyIndex: BigInt,
  currencyName: string
): Currency_NameUpdated {
  let currencyNameUpdatedEvent = changetype<Currency_NameUpdated>(
    newMockEvent()
  )

  currencyNameUpdatedEvent.parameters = new Array()

  currencyNameUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "currencyIndex",
      ethereum.Value.fromUnsignedBigInt(currencyIndex)
    )
  )
  currencyNameUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "currencyName",
      ethereum.Value.fromString(currencyName)
    )
  )

  return currencyNameUpdatedEvent
}

export function createGBMPreset_DefaultUpdatedEvent(
  presetID: BigInt
): GBMPreset_DefaultUpdated {
  let gbmPresetDefaultUpdatedEvent = changetype<GBMPreset_DefaultUpdated>(
    newMockEvent()
  )

  gbmPresetDefaultUpdatedEvent.parameters = new Array()

  gbmPresetDefaultUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "presetID",
      ethereum.Value.fromUnsignedBigInt(presetID)
    )
  )

  return gbmPresetDefaultUpdatedEvent
}

export function createGBMPreset_UpdatedEvent(
  presetID: BigInt,
  auctionDuration: BigInt,
  hammerTimeDuration: BigInt,
  cancellationPeriodDuration: BigInt,
  stepMin: BigInt,
  incentiveMin: BigInt,
  incentiveMax: BigInt,
  incentiveGrowthMultiplier: BigInt,
  firstMinBid: BigInt,
  presetName: string
): GBMPreset_Updated {
  let gbmPresetUpdatedEvent = changetype<GBMPreset_Updated>(newMockEvent())

  gbmPresetUpdatedEvent.parameters = new Array()

  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "presetID",
      ethereum.Value.fromUnsignedBigInt(presetID)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionDuration",
      ethereum.Value.fromUnsignedBigInt(auctionDuration)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "hammerTimeDuration",
      ethereum.Value.fromUnsignedBigInt(hammerTimeDuration)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "cancellationPeriodDuration",
      ethereum.Value.fromUnsignedBigInt(cancellationPeriodDuration)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "stepMin",
      ethereum.Value.fromUnsignedBigInt(stepMin)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveMin",
      ethereum.Value.fromUnsignedBigInt(incentiveMin)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveMax",
      ethereum.Value.fromUnsignedBigInt(incentiveMax)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "incentiveGrowthMultiplier",
      ethereum.Value.fromUnsignedBigInt(incentiveGrowthMultiplier)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "firstMinBid",
      ethereum.Value.fromUnsignedBigInt(firstMinBid)
    )
  )
  gbmPresetUpdatedEvent.parameters.push(
    new ethereum.EventParam("presetName", ethereum.Value.fromString(presetName))
  )

  return gbmPresetUpdatedEvent
}

export function createSaleExecutedEvent(
  saleID: BigInt,
  tokenContractAddress: Address,
  tokenID: BigInt,
  tokenAmount: BigInt,
  price: BigInt,
  leftoverTokens: BigInt,
  leftoverPrice: BigInt
): SaleExecuted {
  let saleExecutedEvent = changetype<SaleExecuted>(newMockEvent())

  saleExecutedEvent.parameters = new Array()

  saleExecutedEvent.parameters.push(
    new ethereum.EventParam("saleID", ethereum.Value.fromUnsignedBigInt(saleID))
  )
  saleExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContractAddress",
      ethereum.Value.fromAddress(tokenContractAddress)
    )
  )
  saleExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  saleExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAmount",
      ethereum.Value.fromUnsignedBigInt(tokenAmount)
    )
  )
  saleExecutedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  saleExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "leftoverTokens",
      ethereum.Value.fromUnsignedBigInt(leftoverTokens)
    )
  )
  saleExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "leftoverPrice",
      ethereum.Value.fromUnsignedBigInt(leftoverPrice)
    )
  )

  return saleExecutedEvent
}

export function createSaleRegistration_NewSaleEvent(
  saleID: BigInt,
  tokenContractAddress: Address,
  tokenID: BigInt,
  tokenAmount: BigInt,
  tokenKind: Bytes,
  tokenOrigin: Address,
  price: BigInt,
  currencyID: BigInt,
  beneficiary: Address,
  startTimestamp: BigInt,
  endTimestamp: BigInt
): SaleRegistration_NewSale {
  let saleRegistrationNewSaleEvent = changetype<SaleRegistration_NewSale>(
    newMockEvent()
  )

  saleRegistrationNewSaleEvent.parameters = new Array()

  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam("saleID", ethereum.Value.fromUnsignedBigInt(saleID))
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContractAddress",
      ethereum.Value.fromAddress(tokenContractAddress)
    )
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAmount",
      ethereum.Value.fromUnsignedBigInt(tokenAmount)
    )
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "tokenKind",
      ethereum.Value.fromFixedBytes(tokenKind)
    )
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "tokenOrigin",
      ethereum.Value.fromAddress(tokenOrigin)
    )
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "currencyID",
      ethereum.Value.fromUnsignedBigInt(currencyID)
    )
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "startTimestamp",
      ethereum.Value.fromUnsignedBigInt(startTimestamp)
    )
  )
  saleRegistrationNewSaleEvent.parameters.push(
    new ethereum.EventParam(
      "endTimestamp",
      ethereum.Value.fromUnsignedBigInt(endTimestamp)
    )
  )

  return saleRegistrationNewSaleEvent
}
