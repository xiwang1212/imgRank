export const styles = theme => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  backButton: {
    borderRadius: 16,
    fontSize: 36,
    width: 256,
    maxWidth: '60%',
    paddingLeft: 16,
    paddingRight: 16,
    marginRight: 16,
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginTop: 8,
      marginBottom: 8,
    },
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
    width: 256,
    maxWidth: '60%',
    paddingLeft: 16,
    paddingRight: 16,
    marginRight: 16,
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginTop: 8,
      marginBottom: 8,
    },
  },
  feedbackArea: {
    width: 256,
    marginBottom: 16,
    [theme.breakpoints.down('md')]: {
      marginTop: 8,
      marginBottom: 8,
    },
  },
  feedbackBox: {
    width: '100%',
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
    width: 260,
    [theme.breakpoints.down('md')]: {
      width: 240,
    }
  },
  videoPlayerUnknown: {
    width: 260,
    zIndex: -1,
    [theme.breakpoints.down('md')]: {
      width: 240,
    }
  },
  videoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 260,
    [theme.breakpoints.down('md')]: {
      width: 240,
      height: 135,
    },
    overflow: 'hidden',
  },
  videoContainerRef: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 320,
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