import React from 'react'
import { Card, Button, Row, Col } from 'antd'

interface Props {
  label: string
  buttonLabel: string
  onClick: () => void
}

export const ButtonCard = ({ label, onClick, buttonLabel }: Props) => {
  return (
    <Card>
      <Row>
        <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', lineHeight: '32px', color: '#000' }}>{label}</div>
        </Col>
        <Col span={12}>
          <Button type="primary" size="large" onClick={onClick}>
            {buttonLabel}
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
