import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'AsixplusDAO',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by AsixplusDAO), NFTs, and more, on a platform you can trust.',
  image: 'https://asixplus.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('AsixplusDAO')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('AsixplusDAO')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('AsixplusDAO')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('AsixplusDAO')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('AsixplusDAO')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('AsixplusDAO')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('AsixplusDAO')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('AsixplusDAO')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('AsixplusDAO')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('AsixplusDAO')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('AsixplusDAO')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('AsixplusDAO')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('AsixplusDAO')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('AsixplusDAO')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('AsixplusDAO')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('AsixplusDAO')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('AsixplusDAO')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('AsixplusDAO')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('AsixplusDAO Info & Analytics')}`,
        description: 'View statistics for AsixplusDAO exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('AsixplusDAO Info & Analytics')}`,
        description: 'View statistics for AsixplusDAO exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('AsixplusDAO Info & Analytics')}`,
        description: 'View statistics for AsixplusDAO exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('AsixplusDAO')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('AsixplusDAO')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('AsixplusDAO')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('AsixplusDAO')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('AsixplusDAO')}`,
      }
    default:
      return null
  }
}
