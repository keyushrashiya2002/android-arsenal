export default {
    slots: [
        {
            id: "1",
            path: "/19968336/header-bid-tag-0",
            sizes: [
                [728, 90],
                [970, 90]
            ],
            prebid: [
                {
                    mediaTypes: {
                        banner: {
                            sizes: [
                                [728, 90],
                                [970, 90]
                            ]
                        }
                    },
                    bids: [
                        {
                            bidder: "appnexus",
                            params: {
                                placementId: 13144370
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "2",
            path: "/1721836/vagas_servicos_home_leaderboard_728x90",
            sizes: [[728, 90]],
            prebid: [
                {
                    mediaTypes: {
                        banner: {
                            sizes: [[728, 90]]
                        }
                    },
                    bids: [
                        { bidder: "appnexus", params: { placementId: "13020891" } },
                        {
                            bidder: "rubicon",
                            params: {
                                accountId: "15452",
                                siteId: "97752",
                                zoneId: "458742",
                                sizes: [2]
                            }
                        },
                        { bidder: "criteo", params: { zoneId: "1114158" } },
                        {
                            bidder: "rtbhouse",
                            params: {
                                region: "prebid-us",
                                publisherId: "s47E9rQXFhkIoxtPOYfm"
                            }
                        },
                        {
                            bidder: "smartadserver",
                            params: {
                                domain: "https://prg.smartadserver.com",
                                siteId: "291460",
                                pageId: "1073506",
                                formatId: "77003"
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "3",
            path: "/1721836/vagas_servicos_home_leaderboard_728x90_02",
            sizes: [[728, 90]],
            prebid: [
                {
                    mediaTypes: {
                        banner: {
                            sizes: [[728, 90]]
                        }
                    },
                    bids: [
                        { bidder: "appnexus", params: { placementId: "13020891" } },
                        {
                            bidder: "rubicon",
                            params: {
                                accountId: "15452",
                                siteId: "97752",
                                zoneId: "458742",
                                sizes: [2]
                            }
                        },
                        { bidder: "criteo", params: { zoneId: "1114158" } },
                        {
                            bidder: "rtbhouse",
                            params: {
                                region: "prebid-us",
                                publisherId: "s47E9rQXFhkIoxtPOYfm"
                            }
                        },
                        {
                            bidder: "smartadserver",
                            params: {
                                domain: "https://prg.smartadserver.com",
                                siteId: "291460",
                                pageId: "1073506",
                                formatId: "77003"
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
