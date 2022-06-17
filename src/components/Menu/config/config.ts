import {
  MenuItemsType,
  SwapIcon,
  SwapFillIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean } & {
  items?: ConfigMenuDropDownItemsType[]
}

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Presale'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/presale',
    showItemsOnMobile: false,
    items: [],
  },
  {
    label: t('Paraswap'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/paraswap',
    showItemsOnMobile: false,
    items: [],
  },
  {
    label: t('Bridge'),
    href: '/bridge',
    icon: TrophyIcon,
    fillIcon: TrophyFillIcon,
    items: [],
  },
  {
    label: t('Dice Game'),
    href: `${nftsBaseUrl}`,
    icon: NftIcon,
    fillIcon: NftFillIcon,
    items: [],
  },
]

export default config
