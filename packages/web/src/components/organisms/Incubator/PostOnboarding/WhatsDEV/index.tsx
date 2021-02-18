import React from 'react'
import { Span } from '../../Typography'
import { Button } from '../../molecules/Button'
import BoardingGrid from '../../molecules/BoardingGrid'
import AnimationContainer from '../../molecules/AnimationContainer'

const DevProtocolLogo = () => {
  return (
    <div style={{ height: 'fit-content' }}>
      <svg width="408" height="204" viewBox="0 0 408 204" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 153H0V170H17V153Z" fill="#00D0FD" />
        <path d="M0 170V187H17H34V170H17H0Z" fill="#5B8BF5" />
        <path d="M119 153V170H102H85V187H68H51V204H68H85H102V187H119H136V170V153V136H119V153Z" fill="#FF3815" />
        <path d="M34 170V187H17V204H34H51V187H68V170H51H34Z" fill="#D500E6" />
        <path
          d="M0 0H17.9562C32.4062 0 42.5 10.0937 42.5 25.2875C42.5 41.3312 32.725 51 17.5312 51H0V0ZM16.3625 44.2C28.6875 44.2 34.7438 37.825 34.7438 25.2875C34.7438 13.9187 28.6875 6.69375 16.7875 6.69375H7.225V44.2H16.3625Z"
          fill="#0A0A0A"
        />
        <path
          d="M53.9749 0H89.9937V6.69375H61.1999V21.25H82.5562V27.8375H61.1999V44.2H89.9937V50.8938H53.9749V0Z"
          fill="#0A0A0A"
        />
        <path
          d="M97.1125 0H105.187L115.6 33.575C116.875 37.6125 117.194 40.6938 117.406 45.05H120.487C120.594 41.225 121.125 37.825 122.4 33.6813L132.919 0H140.888L124.312 50.8938H113.581L97.1125 0Z"
          fill="#0A0A0A"
        />
        <path
          d="M0 68.1062H20.7188C31.3438 68.1062 37.7188 74.4812 37.7188 83.6187C37.7188 92.8625 31.3438 99.2375 20.6125 99.2375H7.225V119H0V68.1062ZM19.3375 92.7562C26.35 92.7562 30.0687 88.825 30.0687 83.5125C30.0687 78.2 26.4563 74.6937 19.3375 74.6937H7.225V92.7562H19.3375Z"
          fill="#0A0A0A"
        />
        <path
          d="M47.1749 68.1062H68.9562C79.2624 68.1062 85.4249 74.0562 85.4249 81.9187C85.4249 85.85 84.1499 88.7187 81.5999 90.525C79.0499 92.3312 75.9687 93.2875 72.2499 93.5V96.5812C79.5812 96.6875 82.3437 99.2375 83.8312 106.25L86.2749 119.106H78.3062L76.1812 106.994C75.1187 100.512 71.8249 98.0687 64.9186 98.0687H54.3999V119H47.1749V68.1062ZM67.8937 91.375C73.9499 91.375 77.7749 88.5062 77.7749 82.9812C77.7749 77.4562 73.9499 74.6937 67.8937 74.6937H54.5061V91.375H67.8937Z"
          fill="#0A0A0A"
        />
        <path
          d="M120.063 67.0438C134.513 66.8313 145.669 77.9875 145.456 93.5C145.669 109.119 134.513 120.169 120.063 119.956C105.613 120.169 94.2438 109.013 94.4563 93.5C94.2438 77.9875 105.719 66.8313 120.063 67.0438ZM120.063 73.6313C109.013 73.6313 102.319 82.1313 102.319 93.5C102.319 105.081 109.013 113.369 120.063 113.369C131.006 113.369 137.806 105.081 137.806 93.5C137.806 82.1313 131.006 73.6313 120.063 73.6313Z"
          fill="#0A0A0A"
        />
        <path d="M167.131 74.8H149.175V68.1062H193.056V74.8H174.462V119H167.237V74.8H167.131Z" fill="#0A0A0A" />
        <path
          d="M222.169 67.0438C236.619 66.8313 247.775 77.9875 247.562 93.5C247.775 109.119 236.619 120.169 222.169 119.956C207.719 120.169 196.35 109.013 196.563 93.5C196.35 77.9875 207.719 66.8313 222.169 67.0438ZM222.062 73.6313C211.013 73.6313 204.319 82.1313 204.319 93.5C204.319 105.081 211.013 113.369 222.062 113.369C233.006 113.369 239.806 105.081 239.806 93.5C239.806 82.1313 233.006 73.6313 222.062 73.6313Z"
          fill="#0A0A0A"
        />
        <path
          d="M281.031 67.0438C293.462 67.0438 301.219 74.4813 303.344 82.1313L296.119 84.7875C295.162 81.8125 293.462 79.2625 291.125 77.0313C288.787 74.8 285.494 73.6313 281.031 73.6313C270.725 73.6313 263.819 80.9625 263.819 92.9688C263.819 105.188 270.725 113.263 281.031 113.263C289.85 113.263 294.1 108.8 296.437 101.788L303.45 104.444C301.006 113.156 293.144 119.956 281.031 119.956C265.519 120.169 255.85 108.056 256.062 93.075C255.85 78.4125 266.581 66.725 281.031 67.0438Z"
          fill="#0A0A0A"
        />
        <path
          d="M336.069 67.0438C350.519 66.8313 361.675 77.9875 361.462 93.5C361.675 109.119 350.519 120.169 336.069 119.956C321.619 120.169 310.25 109.013 310.462 93.5C310.25 77.9875 321.725 66.8313 336.069 67.0438ZM336.069 73.6313C325.019 73.6313 318.325 82.1313 318.325 93.5C318.325 105.081 325.019 113.369 336.069 113.369C347.012 113.369 353.812 105.081 353.812 93.5C353.812 82.1313 347.012 73.6313 336.069 73.6313Z"
          fill="#0A0A0A"
        />
        <path d="M373.256 68.1062H380.481V112.2H408V119H373.256V68.1062Z" fill="#0A0A0A" />
      </svg>
    </div>
  )
}

type PostOnboardType = {
  onActivePageChange: React.Dispatch<React.SetStateAction<number>>
}

const WhatsDEV = ({ onActivePageChange }: PostOnboardType) => {
  return (
    <BoardingGrid>
      <AnimationContainer>
        <DevProtocolLogo />
      </AnimationContainer>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Span style={{ paddingTop: '3em' }} fontSize="24px" fontWeight="bold">
          What is DEV protocol?
        </Span>
        <Span style={{ paddingTop: '3em' }} fontSize="16px">
          Stakes Social is Dev Protocol’s user facing application where OSS projects and patrons connect. OSS projects
          use Stakes Social to tokenize, obtain patrons, build communities, and incentive stakeholders in order to grow
          their project. Patrons use Stakes Social to stake the DEV token for OSS projects they support.
        </Span>
      </div>
      <div style={{ paddingBottom: '5em', gridColumn: '1/-1', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => onActivePageChange(2)}>Next</Button>
      </div>
    </BoardingGrid>
  )
}

export default WhatsDEV
