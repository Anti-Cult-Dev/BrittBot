export interface GameStats {
  home: {
    team: string;
    score: number;
    record: string;
    stats: {
      totalYards?: number;
      passingYards?: number;
      rushingYards?: number;
    };
  };
  away: {
    team: string;
    score: number;
    record: string;
    stats: {
      totalYards?: number;
      passingYards?: number;
      rushingYards?: number;
    };
  };
  quarter: string;
  clock: string;
  lastPlay?: string;
  down?: number;
  distance?: number;
  possession?: string;
}

export async function getGameStats(): Promise<GameStats | null> {
  try {
    const response = await fetch(
      'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
    );
    const data = await response.json();
    
    // Find Chiefs game
    const chiefsGame = data.events?.find(event => 
      event.competitions[0].competitors.some(team => 
        team.team.abbreviation === 'KC'
      )
    );

    if (!chiefsGame) return null;

    const competition = chiefsGame.competitions[0];
    const homeTeam = competition.competitors.find(team => team.homeAway === 'home');
    const awayTeam = competition.competitors.find(team => team.homeAway === 'away');

    return {
      home: {
        team: homeTeam.team.abbreviation,
        score: parseInt(homeTeam.score),
        record: homeTeam.records[0].summary,
        stats: {
          totalYards: homeTeam.statistics?.find(stat => stat.name === 'totalYards')?.value,
          passingYards: homeTeam.statistics?.find(stat => stat.name === 'netPassingYards')?.value,
          rushingYards: homeTeam.statistics?.find(stat => stat.name === 'rushingYards')?.value,
        }
      },
      away: {
        team: awayTeam.team.abbreviation,
        score: parseInt(awayTeam.score),
        record: awayTeam.records[0].summary,
        stats: {
          totalYards: awayTeam.statistics?.find(stat => stat.name === 'totalYards')?.value,
          passingYards: awayTeam.statistics?.find(stat => stat.name === 'netPassingYards')?.value,
          rushingYards: awayTeam.statistics?.find(stat => stat.name === 'rushingYards')?.value,
        }
      },
      quarter: competition.status.period,
      clock: competition.status.displayClock,
      lastPlay: competition.situation?.lastPlay?.text,
      down: competition.situation?.down,
      distance: competition.situation?.distance,
      possession: competition.situation?.possession
    };
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return null;
  }
}
