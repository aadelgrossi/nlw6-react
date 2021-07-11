import { useMemo } from 'react'

import { Switch, HStack, Icon, BoxProps } from '@chakra-ui/react'
import { HiOutlineMoon, HiMoon, HiSun, HiOutlineSun } from 'react-icons/hi'

import { useTheme } from './'

export const ThemeToggle = (props: BoxProps): JSX.Element => {
  const { toggleTheme, activeTheme } = useTheme()
  const isDark = useMemo(() => activeTheme === 'dark', [activeTheme])

  return (
    <HStack justify="center" {...props}>
      <Icon
        as={isDark ? HiOutlineSun : HiSun}
        color={isDark ? 'text' : 'secondary'}
        w={4}
        h={4}
      />
      <Switch
        size="lg"
        onChange={toggleTheme}
        color="black"
        colorScheme="black"
      />
      <Icon
        as={!isDark ? HiOutlineMoon : HiMoon}
        color={!isDark ? 'text' : 'secondary'}
        w={4}
        h={4}
      />
    </HStack>
  )
}
