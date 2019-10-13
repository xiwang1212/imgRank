export const styles = theme => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  buttonSection: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  nextButton: {
    borderRadius: 16,
    fontSize: 36,
    width: 570,
    maxWidth: '80%',
    paddingLeft: 32,
    paddingRight: 32,
  },
  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '70%',
  },
  rankingText: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  rankingTextSection: {
    display: 'flex',
    width: 1396,
    justifyContent: 'space-between',
  },
  referenceBackground: {
    background: '#E0E0E2',
    display: 'flex',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  referenceSection: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'flex-start',
    overflow: 'auto',
  },
  snackbarError: {
    flexWrap: 'nowrap!important',
    backgroundColor: '#a31f34!important',
  },
  videoPlayerRef: {
    width: 320,
    [theme.breakpoints.down('md')]: {
      width: 240,
    }
  },
  videoPlayerUnknown: {
    width: 280,
    [theme.breakpoints.down('md')]: {
      width: 240,
    }
  },
  videoContainer: {
    width: 280,
    height: 157.5,
    [theme.breakpoints.down('md')]: {
      width: 240,
      height: 135,
    },
    overflow: 'hidden',
  },
  videoContainerRef: {
    width: 320,
    height: 180.3,
    paddingLeft: 8,
    paddingRight: 8,
    [theme.breakpoints.down('md')]: {
      width: 240,
      height: 135,
    },
    overflow: 'hidden',
  },
  videoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  unknownSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflow: 'scroll',
    justifyContent: 'center',
  },
});