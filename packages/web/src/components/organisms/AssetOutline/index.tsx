import React from 'react'
import { List, Space } from 'antd'
import { CircleGraph } from 'src/components/atoms/CircleGraph'
import { useAssetStrength } from 'src/fixtures/dev-kit/hooks'
import { truncate } from 'src/fixtures/utility/string'

interface Props {
  metricsAddress: string
  marketAddress: string
}

export const AssetOutline = ({ metricsAddress, marketAddress }: Props) => {
  const { assetStrength } = useAssetStrength(metricsAddress, marketAddress)
  const includedAssets = ['x-lib', 'x-plugin-lib', 'x-xxx', 'x-xxxxxxxxxxxxxxxxxxxx']

  return (
    <div>
      <Space direction="horizontal" size={112}>
        <div>
          <p style={{ fontSize: '18px', lineHeight: '24px', color: '#000' }}>Included Assets</p>
          <List
            bordered
            dataSource={includedAssets}
            renderItem={item => (
              <List.Item style={{ fontSize: '24px', lineHeight: '32px', color: '#000' }}>
                {truncate(item, 15)}
              </List.Item>
            )}
            style={{ maxWidth: '272px' }}
          />
        </div>
        <div>
          <p style={{ fontSize: '18px', lineHeight: '24px', color: '#000', padding: '0 36px' }}>Assets Strength</p>
          <Space direction="horizontal" size={40}>
            <CircleGraph size={224} percentage={assetStrength ? assetStrength : 0} />
            <div>
              <span style={{ fontSize: '36px', lineHeight: '48px', color: '#000' }}>
                {assetStrength ? assetStrength * 100 : 0}%
              </span>
              <span> of total market</span>
            </div>
          </Space>
        </div>
      </Space>
    </div>
  )
}
