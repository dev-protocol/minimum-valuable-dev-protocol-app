import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography

export const H1: React.FC = ({ children }) => <Title level={1}>{children}</Title>
export const H2: React.FC = ({ children }) => <Title level={2}>{children}</Title>
