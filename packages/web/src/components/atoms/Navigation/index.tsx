import styled from 'styled-components'
import { Menu } from 'antd'

export const NavMenu = styled(Menu)`
  color: white;

  width: fit-content;

  .ant-menu-item-selected {
    background: -moz-linear-gradient(top, #639fff 1%, #2187ed 100%);
    background: -webkit-linear-gradient(top, #639fff 1%, #2187ed 100%);
    background: linear-gradient(to bottom, #639fff 1%, #2187ed 100%);
  }
`
export const NavMenuItem = styled(NavMenu.Item)`
  background-color: black;
  margin-left: 2em;
`

export const AccountBtn = styled.div`
  color: white;
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 1.1rem;
  height: 47px;
  cursor: pointer;
  line-height: 45px;
  padding: 0px 15px;

  &:hover {
    background: #272727;
  }

  @media (max-width: 768px) {
    right: 5px;
    padding: 0px 10px;
    transform: translateY(1px);
  }
`

export const Connecting = styled.div`
  color: white;
  font-size: 0.8em;

  @keyframes blink {
    0% {
      opacity: 0.7;
    }

    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.7;
    }
  }

  -webkit-text-fill-color: white;
  animation-name: blink;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
`
