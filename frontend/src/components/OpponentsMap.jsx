const OpponentsMap = ( { opponentsGrid } ) => {

	return (
		<div className="room-grid-middle-right-content">
			<div className="opponents-grid">
				{opponentsGrid.map((map, i) => (
					<div className="grid-content" key={i}>
						<p>{map.pseudo}</p>
						<div className="opponents-grids" key={i}>
							{map.map.map((row, rowIndex) => (
								<div key={rowIndex} className="row">
									{row.map((cell, cellIndex) => (
										<div key={cellIndex} className={`cell ${cell}`} />
									))}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OpponentsMap;
