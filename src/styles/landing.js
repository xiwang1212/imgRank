import Background from '../background.jpg';

export const styles = theme => ({
  root: {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
  },
  buttonSection: {
    display: 'flex',
    paddingBottom: 16,
  },
  descriptionSection: {
    display: 'flex',
    padding: 16,
    height: '65%',
    width: '100vw',
    flexDirection: 'column',
  },
  descriptionTitle: {
    paddingBottom: 16,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 380,
  },
  singleStep: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    borderRadius: 16,
    fontSize: 36,
    width: 570,
    paddingLeft: 32,
    paddingRight: 32,
  },
  stepSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 24,
  },
  stepText: {
    fontSize: 24,
  },
  subtitle: {
    width: '70%',
    fontSize: 36,
    paddingBottom: 36,
  },
  title: {
    fontSize: 72,
    paddingBottom: 16,
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 16,
  },
});