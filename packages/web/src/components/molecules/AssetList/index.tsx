import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Empty, Pagination, Skeleton } from 'antd'
import { AssetItemOnList } from '../AssetItemOnList'
import { ResponsiveModal } from 'src/components/atoms/ResponsiveModal'
import { TransactModalContents } from '../TransactModalContents'

interface Props {
  className?: string
  properties?: string[]
  onPagination?: (page: number) => void
  loading?: boolean
  enableStake?: boolean
  enableWithdrawStakersReward?: boolean
  enableWithdrawHoldersReward?: boolean
}

interface ModalStates {
  visible: boolean
  title?: string
  contents?: React.ReactNode
}

const Wrap = styled.div`
  display: grid;
`

const Item = styled(AssetItemOnList)`
  &:not(:last-of-type) {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
`

const StyledPagination = styled(Pagination)`
  margin-top: 1rem;
`

export const AssetList = ({
  className,
  properties,
  onPagination,
  enableStake,
  enableWithdrawStakersReward,
  enableWithdrawHoldersReward,
  loading = false
}: Props) => {
  const [page, setPage] = useState<number>(0)
  const [modalStates, setModalStates] = useState<ModalStates>({ visible: false })
  const handlePagination = useCallback(
    (page: number) => {
      setPage(page)
      if (onPagination) {
        onPagination(page)
      }
    },
    [setPage, onPagination]
  )
  const showModal = (type: 'stake' | 'withdraw' | 'holders') => (propertyAddress: string) => {
    const contents = <TransactModalContents propertyAddress={propertyAddress} type={type} />
    const title = type === 'stake' ? 'Stake' : 'Withdraw'
    setModalStates({ visible: true, contents, title })
  }
  const closeModal = () => {
    setModalStates({ ...modalStates, visible: false })
  }

  return loading ? (
    <Skeleton active></Skeleton>
  ) : (
    <Wrap className={className}>
      {properties && properties.length > 0 ? (
        properties.map(item => (
          <Item
            propertyAddress={item}
            key={item}
            enableStake={enableStake}
            enableWithdrawStakersReward={enableWithdrawStakersReward}
            enableWithdrawHoldersReward={enableWithdrawHoldersReward}
            onClickStake={showModal('stake')}
            onClickWithdrawStakersReward={showModal('withdraw')}
            onClickWithdrawHoldersReward={showModal('holders')}
          ></Item>
        ))
      ) : (
        <Empty />
      )}
      <ResponsiveModal visible={modalStates.visible} title={modalStates.title} onCancel={closeModal} footer={null}>
        {modalStates.contents}
      </ResponsiveModal>
      <StyledPagination current={page} size="default" responsive={true} onChange={handlePagination} />
    </Wrap>
  )
}
