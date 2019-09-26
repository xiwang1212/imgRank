import Background from '../background.jpg';

export const styles = theme => ({
  root: {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
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
  },
  nextButton: {
    borderRadius: 16,
    fontSize: 36,
    width: 570,
    paddingLeft: 32,
    paddingRight: 32,
  },
  progressSection: {
    width: '50%',
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
    padding: 8,
    borderRadius: 8,
  },
  referenceSection: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  snackbarError: {
    flexWrap: 'nowrap!important',
    backgroundColor: '#a31f34!important',
  },
  videoPlayerRef: {
    width: 320,
    padding: '8px 16px 8px 16px',
  },
  videoPlayerUnknown: {
    width: 280,
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