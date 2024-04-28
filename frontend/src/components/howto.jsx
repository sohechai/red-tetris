import leftRightArrows from "../assets/left-right-arrows.svg";
import upArrow from "../assets/up-arrow.svg";
import downArrow from "../assets/down-arrow.svg";
import spacebar from "../assets/spacebar.svg";

const Howto = () => {
  return (
    <div className="howto-container">
      <div className="howto-content">
        <header>
          <h1 className="game-font">How to Play Red Tetris</h1>
        </header>

        <main>
          <section>
            <h2>Welcome to Red Tetris!</h2>
            <p>
              This guide will help you understand the game's rules, controls,
              and strategies to enhance your playing experience.
            </p>
          </section>

          <section>
            <h2>Game Overview</h2>
            <p>
              Red Tetris is a multiplayer puzzle game inspired by the classic
              Tetris. The objective is to manipulate the descending tetriminos
              to form and clear complete horizontal lines. The game ends when
              the tetriminos reach the top of the screen.
            </p>
          </section>

          <section>
            <h2>Game Rules</h2>
            <div className="howto-block">
              <p>
                <strong>Objective:</strong> Position the tetriminos to complete
                full horizontal lines, which will then clear from the board.
              </p>
              <p>
                <strong>Game End:</strong> The game continues until there is no
                space left to accommodate the incoming tetriminos at the top of
                the playfield.
              </p>
              <p>
                <strong>Multiplayer Interaction:</strong> When you complete one
                or more lines, the cleared lines minus one will appear as
                'garbage lines' at the bottom of your opponents playfields.
              </p>
            </div>
          </section>

          <section>
            <h2>Controls</h2>
            <div className="howto-block">
              <p>
                <img alt="left-right-arrows" src={leftRightArrows} />
                Move the tetrimino left or right.
              </p>
              <p>
                <img alt="up-arrow" src={upArrow} />
                Rotate the tetrimino clockwise.
              </p>
              <p>
                <img alt="down-arrow" src={downArrow} />
                Accelerate the descent of the tetrimino.
              </p>
              <p>
                <img alt="spacebar" src={spacebar} />
                Instantly drop the tetrimino to the bottom of the playfield.
              </p>
            </div>
          </section>

          <section>
            <h2>Tips and Strategies</h2>
            <div className="howto-block">
              <p>
                <strong>Line Clearing:</strong> Try to clear multiple lines at
                once to send more garbage lines to your opponents.
              </p>
              <p>
                <strong>Holding Pieces:</strong> Use the hold queue to save
                tetriminos for later use, optimizing your placement strategy.
              </p>
              <p>
                <strong>Planning Ahead:</strong> Keep an eye on the next
                tetrimino in the queue to plan your placements more effectively.
              </p>
            </div>
          </section>

          <section>
            <h2>Frequently Asked Questions (FAQ)</h2>
            <dl>
              <dt>Q: Can I join a game already in progress?</dt>
              <dd>A: No, you must wait for a game to finish before joining.</dd>

              <dt>Q: What happens when I clear four lines at once?</dt>
              <dd>
                A: Clearing four lines at once is known as a 'Tetris' and is
                highly effective in sending garbage lines to your opponents.
              </dd>

              <dt>Q: Are there different levels of difficulty?</dt>
              <dd>
                A: Yes, the game speed increases as you progress, making it more
                challenging.
              </dd>
            </dl>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Howto;
