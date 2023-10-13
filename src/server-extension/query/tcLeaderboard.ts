export const tcLeaderboardQuery = (): string => `
    SELECT rank() OVER (ORDER BY prize DESC) "rank", * FROM
        (SELECT t.participant_id AS address, sum(t.win_amount * t.win_token_price_in_usd / 10^t.win_token_decimal) AS prize FROM tc_participant AS t
            JOIN "user" AS u ON t.participant_id = u.id
            GROUP BY t.participant_id, u.id) traders
`

export const tcRankByAddressQuery = (): string => `
    SELECT * FROM 
        (SELECT rank() OVER (ORDER BY prize DESC) "rank", * FROM
        (SELECT t.participant_id AS address, sum(t.win_amount * t.win_token_price_in_usd / 10^t.win_token_decimal) AS prize FROM tc_participant AS t
                JOIN "user" AS u ON t.participant_id = u.id
                    GROUP BY t.participant_id, u.id) traders) leaderboard
        WHERE address = $1
`