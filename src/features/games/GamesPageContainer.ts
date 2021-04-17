import { RootState } from 'app/store';
import { connect } from 'react-redux';
import Games from './GamesPage';
import { selectAllGames } from './gamesSlice';

const mapStateToProps = (state: RootState) => ({
  games: selectAllGames(state),
});

export default connect(mapStateToProps)(Games);
