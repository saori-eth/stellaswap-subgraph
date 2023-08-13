import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { AuctionBid_Displaced } from "../generated/schema"
import { AuctionBid_Displaced as AuctionBid_DisplacedEvent } from "../generated/Diamond/Diamond"
import { handleAuctionBid_Displaced } from "../src/diamond"
import { createAuctionBid_DisplacedEvent } from "./diamond-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let saleID = BigInt.fromI32(234)
    let bidIndex = BigInt.fromI32(234)
    let bidder = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let bidamount = BigInt.fromI32(234)
    let incentivesPaid = BigInt.fromI32(234)
    let newAuctionBid_DisplacedEvent = createAuctionBid_DisplacedEvent(
      saleID,
      bidIndex,
      bidder,
      bidamount,
      incentivesPaid
    )
    handleAuctionBid_Displaced(newAuctionBid_DisplacedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AuctionBid_Displaced created and stored", () => {
    assert.entityCount("AuctionBid_Displaced", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuctionBid_Displaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "saleID",
      "234"
    )
    assert.fieldEquals(
      "AuctionBid_Displaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidIndex",
      "234"
    )
    assert.fieldEquals(
      "AuctionBid_Displaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidder",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AuctionBid_Displaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidamount",
      "234"
    )
    assert.fieldEquals(
      "AuctionBid_Displaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "incentivesPaid",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
