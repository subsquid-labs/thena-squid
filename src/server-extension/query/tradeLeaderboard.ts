export const tradeLeaderboardQuery = (period: string): string => `
    SELECT rank() OVER (ORDER BY volume DESC) "rank", * FROM
        (SELECT t.user_id AS address, sum(t.amount_usd) AS volume FROM trade AS t
            JOIN "user" AS u ON t.user_id = u.id
            WHERE (t.timestamp BETWEEN now() - INTERVAL '${period}' AND now()) AND u.is_contract = FALSE
            GROUP BY t.user_id, u.id) traders
`

export const tradeRankByAddressQuery = (period: string): string => `
    SELECT * FROM 
        (SELECT rank() OVER (ORDER BY volume DESC) "rank", * FROM
            (SELECT t.user_id AS address, sum(t.amount_usd) AS volume FROM trade AS t
                JOIN "user" AS u ON t.user_id = u.id
                WHERE (t.timestamp BETWEEN now() - INTERVAL '${period}' AND now()) AND u.is_contract = FALSE
                GROUP BY t.user_id, u.id) traders) leaderboard
        WHERE address = $1
`