import { TypeormDatabase } from '@subsquid/typeorm-store'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { lookupArchive } from '@subsquid/archive-registry'
import fs from 'fs'

import * as solidlyPoolFactoryAbi from './abi/solidly-pool-factory'
import * as algebraPoolFactoryAbi from './abi/algebra-pool-factory'

const SOLIDLY_FACTORY = '0xafd89d21bdb66d00817d4153e055830b1c2b3970'
const ALGEBRA_FACTORY = '0x306f06c147f064a010530292a1eb6737c3e378e4'

const earliestPairFactoryDeploymentBlock = 24468802

const processor = new EvmBatchProcessor()
  .setDataSource({
    archive: lookupArchive('binance'),
  })
  .setBlockRange({
    from: earliestPairFactoryDeploymentBlock
  })
  .addLog(SOLIDLY_FACTORY, {
    filter: [[
      solidlyPoolFactoryAbi.events.PairCreated.topic
    ]],
    data: {
      evmLog: {
        topics: true,
        data: true
      }
    }
  })
  .addLog(ALGEBRA_FACTORY, {
    filter: [[
      algebraPoolFactoryAbi.events.Pool.topic
    ]],
    data: {
      evmLog: {
        address: true,
        topics: true,
        data: true
      }
    }
  })

let solidlyPools: string[] = []
let algebraPools: string[] = []

processor.run(new TypeormDatabase(), async (ctx) => {
  for (let c of ctx.blocks) {
    for (let i of c.items) {
      if (i.kind !== 'evmLog') continue

      if (i.address === SOLIDLY_FACTORY) {
        let {
          token0,
          token1,
          stable,
          pair
        } = solidlyPoolFactoryAbi.events.PairCreated.decode(i.evmLog)
        solidlyPools.push(pair)
      }

      if (i.address === ALGEBRA_FACTORY) {
        let {
          token0,
          token1,
          pool
        } = algebraPoolFactoryAbi.events.Pool.decode(i.evmLog)
        algebraPools.push(pool)
      }
    }
  }

  let block = ctx.blocks[ctx.blocks.length-1].header.height
  let pools = {
    block,
    pools: {
      [SOLIDLY_FACTORY]: solidlyPools,
      [ALGEBRA_FACTORY]: algebraPools
    }
  }
  fs.writeFileSync('pools.json', JSON.stringify(pools))

  if (ctx.isHead) process.exit()
});

