import { TypeormDatabase } from '@subsquid/typeorm-store'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { lookupArchive } from '@subsquid/archive-registry'
import fs from 'fs'

import * as abi from './abi/pair-factory'

const earliestPairFactoryDeploymentBlock = 24468802
const pairFactories = [
  '0xAFD89d21BdB66d00817d4153E055830B1c2B3970'
]

const processor = new EvmBatchProcessor()
  .setDataSource({
    archive: lookupArchive('binance'),
  })
  .setBlockRange({
    from: earliestPairFactoryDeploymentBlock
  })
  .addLog(pairFactories, {
    filter: [[
      abi.events.PairCreated.topic
    ]],
    data: {
      evmLog: {
        topics: true,
        data: true
      }
    }
  })

let pools: string[] = []

processor.run(new TypeormDatabase(), async (ctx) => {
  for (let c of ctx.blocks) {
    for (let i of c.items) {
      if (i.kind !== 'evmLog') continue
      let {
        token0,
        token1,
        stable,
        pair
      } = abi.events.PairCreated.decode(i.evmLog)
      pools.push(pair)
    }
  }

  let block = ctx.blocks[ctx.blocks.length-1].header.height
  fs.writeFileSync('pools.json', JSON.stringify({block, pools}))

  if (ctx.isHead) process.exit()
});

