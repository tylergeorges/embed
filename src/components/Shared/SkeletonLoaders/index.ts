import { styled, theme, keyframes, commonComponentId } from '@stitches';

const SkeletonLoader = keyframes({
  '0%': {
    opacity: '40%'
  },
  '50%': {
    opacity: '80%'
  },
  '100%': {
    opacity: '40%'
  }
});

export const SkeletonLoaderRoot = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'skeleton-loader_root'
})('div', {
  animation: `${SkeletonLoader} 3s infinite ease-in-out`,
  background: theme.colors.primaryOpacity20,
  pointerEvents: 'none',
  userSelect: 'none'
});

export const MessageSkeletonWrapper = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-skeleton_wrapper'
})('div', {
  display: 'flex',
  flexDirection: 'row',

  width: '100%',

  marginTop: theme.space.xl,

  paddingRight: 48,
  paddingLeft: 72,
  paddingTop: theme.space.xs,
  paddingBottom: theme.space.xs
});

export const MessageSkeletonContent = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-skeleton_content'
})('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  textAlign: 'left',

  backgroundColor: 'transparent',
  pointerEvents: 'none',
  userSelect: 'none'
});

export const SkeletonLine = styled.withConfig({
  displayName: 'message-skeleton_content_word'
})('div', {
  position: 'relative',

  height: theme.sizes.xs,

  marginLeft: theme.space.sm,

  borderRadius: theme.radii.lg,

  color: 'transparent',
  background: theme.colors.primaryOpacity10,
  animation: `${SkeletonLoader} 2s infinite ease-in-out`,
  pointerEvents: 'none',

  variants: {
    size: {
      xxs: { width: theme.sizes.xxs, height: theme.sizes.xxs },
      xs: { width: theme.sizes.xs },
      sm: { width: theme.sizes.sm },
      md: { width: theme.sizes.md },
      lg: { width: theme.sizes.lg },
      xl: { width: theme.sizes.xl },
      xxl: { width: theme.sizes.xxl }
    },

    borderRadius: {
      semiRound: {
        borderRadius: theme.radii.xxs
      },

      round: {
        borderRadius: theme.radii.round
      }
    }
  }
});

export const MessageSkeletonUsername = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-skeleton_username'
})(SkeletonLoaderRoot, {
  fontSize: theme.fontSizes.lg,

  width: 150,
  height: 22,

  margin: 0,

  borderRadius: theme.radii.sm,

  color: 'transparent',
  pointerEvents: 'none',
  userSelect: 'none',
  background: theme.colors.primaryOpacity10,
  animationDelay: '1s'
});

export const MessageSkeletonAvatar = styled.withConfig({
  componentId: commonComponentId,
  displayName: 'message-skeleton_avatar'
})(SkeletonLoaderRoot, {
  position: 'absolute',
  left: theme.space.lg,

  width: 40,
  height: 40,

  borderRadius: theme.radii.round
});
