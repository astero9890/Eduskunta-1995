// ===== GAME STATE =====

const gameState = {
    party:null,
    governmentType:null,
    governmentFormed:false,
    minoritySupport:null,
    turn:1,
    funds:300000,   
    selectedDistrict:null,
    districtSupport:{},
    initialDistrictSupport:{},
    seats:{
        SDP:0,
        KESK:0,
        KOK:0,
        VAS:0,
        VIHR:0,
        RKP:0,
        SKL:0,
        ALAND:0,
    },
    partyRelations:{
        SDP:{
            KESK:0,
            KOK:0,
            VAS:0,
            VIHR:0,
            RKP:0,
            SKL:0,
            ALAND:0,
        },
        KESK:{
            SDP:0,
            KOK:0,
            VAS:0,
            VIHR:0,
            RKP:0,
            SKL:0,
            ALAND:0,
        },
        KOK:{
            SDP:0,
            KESK:0,
            VAS:0,
            VIHR:0,
            RKP:0,
            SKL:0,
            ALAND:0,
        },
        VAS:{
            SDP:0,
            KESK:0,
            KOK:0,
            VIHR:0,
            RKP:0,
            SKL:0,
            ALAND:0,
        },
        VIHR:{
            SDP:0,
            KESK:0,
            KOK:0,
            VAS:0,
            RKP:0,
            SKL:0,
            ALAND:0,
        },
        RKP:{
            SDP:0,
            KESK:0,
            KOK:0,
            VAS:0,
            VIHR:0,
            SKL:0,
            ALAND:0,
        },
        SKL:{
            SDP:0,
            KESK:0,
            KOK:0,
            VAS:0,
            VIHR:0,
            RKP:0,
            ALAND:0,
        },
        ALAND:{
            SDP:0,
            KESK:0,
            KOK:0,
            VAS:0,
            VIHR:0,
            RKP:0,
            SKL:0,
        }
    },
    ideology:{
        social:0,
        economic:0,
    },
    triggeredEvents:[],
    debateTriggered:{
        economy:false,
        eu:false,
    },
    debatePreparation:false,
    debate:{
        active:false,
        topic:null,
        round:0,
        id:null,
        playerScore:0,
        scores:{
            KESK:0,
            SDP:0,
            KOK:0,
        },
    },
    debatePreparation:{
        economy:null,
        eu:null,
    },
    electionresults:{},
    government:null,
}

// ===== PARTIES =====

const PARTY_DESCRIPTIONS = {
    KESK:"Esko Aho and the Centre Party government are going into the 1995 election on the defence, campaigning on economic recovery during one of Finland's worst recessions, development, and defending the interests of Finland's rural community.",
    SDP:"Paavo Lipponen leads the Social Democratic Party, attacking the incumbent Esko Aho government for their unpopular austerity measures, campaigning on employment, social security and the welfare state.",
    KOK:"Sauli Niinistö leads the National Coalition Party, campaigning to hope to take government, running on economic liberalism, fiscal responsibility, and the further integration of Finland with the European Union and Western Europe.",
}

const PARTIES = {
    SDP:{
        name:"Social Democratic Party",
        leader:"Paavo Lipponen",
        ideology:{
            social:-1,
            economic:-1,
        }
    },
    KESK:{
        name:"Centre Party",
        leader:"Esko Aho",
        ideology:{
            social:0,
            economic:0,
        }
    },
    KOK:{
        name:"National Coalition Party",
        leader:"Sauli Niinistö",
        ideology:{
            social:1,
            economic:1,
        }
    },
}

const OTHER_PARTIES = {
    VAS:{
        name:"Left Alliance",
        leader:"...",
        seats:0,
        ideology:{
            social:-2,
            economic:-2,
        }
    },
    VIHR:{
        name:"Green League",
        leader:"...",
        seats:0,
        ideology:{
            social:-2,
            economic:-2,
        }
    },
    RKP:{
        name:"Swedish People's Party",
        leader:"...",
        seats:0,
        ideology:{
            social:1,
            economic:1,
        }
    },
    SKL:{
        name:"Christian League",
        leader:"...",
        seats:0,
        ideology:{
            social:2,
            economic:2,
        }
    },
    ALAND:{
        name:"Liberals for Åland",
        leader:"...",
        seats:0,
        ideology:{
            social:-1,
            economic:1,
        }
    },
}

const ALL_PARTIES = {
    ...PARTIES,
    ...OTHER_PARTIES
}

const PARTY_LOGO = {
    KESK:"https://file.garden/aZo5FVsRbiDb3nc-/finland/CentrePartyLogo.png",
    SDP:"https://file.garden/aZo5FVsRbiDb3nc-/finland/SDPPartyLogo.png",
    KOK:"https://file.garden/aZo5FVsRbiDb3nc-/finland/KokoomusPartyLogo.png",
}

const MAJOR_PARTIES = ["SDP","KESK","KOK"];

const IDEOLOGY_SCALE = {
    EXTREME_LEFT: -3,
    LEFT: -2,
    CENTER_LEFT: -1,
    CENTER: 0,
    CENTER_RIGHT: 1,
    RIGHT: 2,
    EXTREME_RIGHT: 3,
}

const DISTRICT_BASELINE = {
    Helsinki:{
        SDP:3,
        KESK:-18,
        KOK:5,
        VAS:2,
        VIHR:8,
        RKP:-2,
        SKL:0,
        ALAND:0,
    },
    Uusimaa:{
        SDP:2,
        KESK:-10,
        KOK:6,
        VAS:0,
        VIHR:2,
        RKP:5,
        SKL:-2,
        ALAND:0,
    },
    "Varsinais-Suomi":{
        SDP:6,
        KESK:-2,
        KOK:2,
        VAS:0,
        VIHR:0,
        RKP:1,
        SKL:0,
        ALAND:0,
    },
    Satakunta:{
        SDP:5,
        KESK:0,
        KOK:0,
        VAS:1,
        VIHR:-2,
        RKP:-4,
        SKL:0,
        ALAND:0,
    },
    Hame:{
        SDP:4,
        KESK:-3,
        KOK:3,
        VAS:0,
        VIHR:-1,
        RKP:-4,
        SKL:0,
        ALAND:0,
    },
    Pirkanmaa:{
        SDP:5,
        KESK:-2,
        KOK:2,
        VAS:2,
        VIHR:1,
        RKP:-4,
        SKL:0,
        ALAND:0,
    },
    Kymi:{
        SDP:9,
        KESK:-2,
        KOK:1,
        VAS:0,
        VIHR:-2,
        RKP:-4,
        SKL:0,
        ALAND:0,
    },
    Mikkeli:{
        SDP:6,
        KESK:4,
        KOK:-1,
        VAS:-3,
        VIHR:-2,
        RKP:-5,
        SKL:1,
        ALAND:0,
    },
    "North-Karelia":{
        SDP:7,
        KESK:3,
        KOK:-3,
        VAS:-2,
        VIHR:-2,
        RKP:-5,
        SKL:1,
        ALAND:0,
    },
    Kuopio:{
        SDP:0,
        KESK:-8,
        KOK:-3,
        VAS:3,
        VIHR:-1,
        RKP:-5,
        SKL:0,
        ALAND:0,
    },
    "Central-Finland":{
        SDP:6,
        KESK:5,
        KOK:-3,
        VAS:2,
        VIHR:-1,
        RKP:-5,
        SKL:1,
        ALAND:0,
    },
    Vaasa:{
        SDP:-7,
        KESK:10,
        KOK:-2,
        VAS:-3,
        VIHR:-2,
        RKP:12,
        SKL:0,
        ALAND:0,
    },
    Oulu:{
        SDP:-7,
        KESK:12,
        KOK:-3,
        VAS:3,
        VIHR:-2,
        RKP:-5,
        SKL:0,
        ALAND:0,
    },
    Lapland:{
        SDP:-5,
        KESK:12,
        KOK:-4,
        VAS:6,
        VIHR:-3,
        RKP:-5,
        SKL:0,
        ALAND:0,
    },
    Aland:{
        SDP:-20,
        KESK:-20,
        KOK:-20,
        VAS:-20,
        VIHR:-20,
        RKP:-20,
        SKL:-20,
        ALAND:30,
    }
}

const PARTY_COLORS = {
    SDP:"#F54B4B",
    KESK:"#3AAD2E",
    KOK:"#006288",
    VAS:"#F00A64",
    VIHR:"#006845",
    RKP:"#FFDD93",
    SKL:"#173653",
    ALAND:"#1F66CA",
}

const smallDistrictMap = {
    Aland:"Aland",
    "Helsinki-Metro":"Helsinki-Metro",
}

function updateFundsDisplay() {
    const span = document.getElementById("currentCampaignFunds");
    span.textContent = (gameState.funds / 1000) + "k";
}

function ideologyKey(text) {
    return text
        .toUpperCase()
        .replaceAll(" ", "_");
}

function ideologyDisplayName(ideology) {
    const names = {
        EXTREME_LEFT: "Extreme left",
        LEFT: "Left",
        CENTER_LEFT: "Centre left",
        CENTER: "Centre",
        CENTER_RIGHT: "Centre right",
        RIGHT: "Right",
        EXTREME_RIGHT: "Extreme right",
    };

    const key = ideologyKey(ideology);
    return names[key] || ideology || "No data :(";
}

// ===== ACTUAL DOCUMENT CONTENT =====

document.addEventListener('DOMContentLoaded', () => {
    const descriptionSpan = document.getElementById("candidateDescription");
    const kakaniaBtn = document.getElementById("KakaniaReform");
    const underwoodBtn = document.getElementById("UnderwoodRepublican");
    const continueBtn = document.getElementById("finishedbutton");
    const candidateMenu = document.getElementById("presidentialcandidatechoice");
    const kakaniaVP = document.getElementById("kakaniavicepresidentialcandidatechoice");
    const underwoodVP = document.getElementById("underwoodvicepresidentialcandidatechoice");
    const vpCandidates = document.querySelectorAll(".candidate");

    const reformContinue = document.getElementById("reformVPFinishedButton");
    const gopContinue = document.getElementById("GOPVPFinishedButton");

    const districtNameSpan = document.getElementById("districtname");
    const ecVoteSpan = document.getElementById("electoralcollegevote");
    const socialSpan = document.getElementById("socialideology");
    const economicSpan = document.getElementById("economicideology");
    const populationSpan = document.getElementById("population");
    const factionSpan = document.getElementById("faction");
    const overallVoteSpan = document.getElementById("overallvote");
    const turncounter = document.getElementById("turncounter");
    let endingAudio = null;

    function updateTurnCounter() {
        turncounter.textContent = gameState.turn;
    }

    function clearSelection() {
        document.querySelectorAll(".candidate").forEach(candidate => {
            candidate.classList.remove("selected");
        });
    }

    const candidatePartyMap = {
        EskoAho:"KESK",
        PaavoLipponen:"SDP",
        SauliNiinisto:"KOK",
    }

    document.querySelectorAll(".candidate").forEach(candidate => {
        candidate.addEventListener("click", () => {
            clearSelection();
            candidate.classList.add("selected");
            const partyId = candidatePartyMap[candidate.id];
            gameState.party = partyId;
            descriptionSpan.textContent = PARTY_DESCRIPTIONS[partyId];
        })
    })

    continueBtn.addEventListener("click", () => {
        if (!gameState.party) {
            alert("Select a party first!");
            return;
        }
        startCampaign();
    });

    function startCampaign() {
        document.getElementById("partyleaderchoice").style.display = "none";
        const campaign = document.getElementById("actualcampaigncontent");
        campaign.style.display = "flex";
        const party = PARTIES[gameState.party];
        gameState.ideology.social = party.ideology.social;
        gameState.ideology.economic = party.ideology.economic;

        updateFundsDisplay();
        initializeDistrictSupport();
        updateMapColors();
        updateTurnCounter();
        updateParliamentMap();
        updateCoalitionLogo();
    }

    function initializeDistrictSupport() {
        document.querySelectorAll("#layer2 path").forEach(district => {
            const districtId = district.id;
            const socialKey = ideologyKey(district.dataset.socialIdeology);
            const economicKey = ideologyKey(district.dataset.economicIdeology);
            const districtSocial = IDEOLOGY_SCALE[socialKey];
            const districtEconomic = IDEOLOGY_SCALE[economicKey];

            gameState.districtSupport[districtId] = {};
            Object.entries(ALL_PARTIES  ).forEach(([partyId, party]) => {
                const partySocial = party.ideology.social;
                const partyEconomic = party.ideology.economic;
                const socialDistance = Math.abs(districtSocial - partySocial);
                const economicDistance = Math.abs(districtEconomic - partyEconomic);
                let support = 10;
                support += DISTRICT_BASELINE[districtId]?.[partyId] || 0;
                support -= economicDistance * 2;
                support -= socialDistance * 1;
                support += Math.random() * 2 - 1;
                support = Math.max(0, support);
                gameState.districtSupport[districtId][partyId] = support;
            });
        });
    }

    function showDistrictInfo(district) {
        gameState.selectedDistrict = district.id;
        document.getElementById("districtname").textContent = district.dataset.name || district.id;
        document.getElementById("socialideology").textContent = ideologyDisplayName(district.dataset.socialIdeology);
        document.getElementById("economicideology").textContent = ideologyDisplayName(district.dataset.economicIdeology);
        document.getElementById("seats").textContent = district.dataset.seats || "No Data :(";

        const alandOnly = document.getElementById("ALANDONLY");

        if (!projectionsAvailable()) {
            document.getElementById("SDPseatshare").textContent = "Unavailable";
            document.getElementById("KESKseatshare").textContent = "Unavailable";
            document.getElementById("KOKseatshare").textContent = "Unavailable";
            document.getElementById("VASseatshare").textContent = "Unavailable";
            document.getElementById("VIHRseatshare").textContent = "Unavailable";
            document.getElementById("RKPseatshare").textContent = "Unavailable";
            document.getElementById("SKLseatshare").textContent = "Unavailable";
            if (district.id === "Aland") {
                alandOnly.style.display = "inline";
                document.getElementById("ALANDseatshare").textContent = "Unavailable";
            } else {
                alandOnly.style.display = "none";
            }

            document.getElementById("overallvote").textContent = "No data for you 😜";
            return;
        }

        const projectedSeats = calculateDistrictSeats(district.id);

        document.getElementById("SDPseatshare").textContent = projectedSeats.SDP || 0;
        document.getElementById("KESKseatshare").textContent = projectedSeats.KESK || 0;
        document.getElementById("KOKseatshare").textContent = projectedSeats.KOK || 0;
        document.getElementById("VASseatshare").textContent = projectedSeats.VAS || 0;
        document.getElementById("VIHRseatshare").textContent = projectedSeats.VIHR || 0;
        document.getElementById("RKPseatshare").textContent = projectedSeats.RKP || 0;
        document.getElementById("SKLseatshare").textContent = projectedSeats.SKL || 0;

        if (district.id === "Aland") {
            alandOnly.style.display = "inline";
            document.getElementById("ALANDseatshare").textContent = projectedSeats.ALAND || 0;
        } else {
            alandOnly.style.display = "none";
            document.getElementById("ALANDseatshare").textContent = 0;
        }

        const leader = Object.entries(projectedSeats).filter(([party]) => party !== "ALAND" || district.id === "Aland") .sort((a,b) => b[1] - a[1])[0];
        document.getElementById("overallvote").textContent = leader ? `${leader[0]} projected to win the most seats` : "No Data :("
    }

    function calculateDistrictSeats(districtId) {
        const support = gameState.districtSupport[districtId];
        const district = document.getElementById(districtId);

        if (!support || !district) return {};

        const totalSeats = Number(district.dataset.seats)

        const votes = {};

        Object.entries(support).forEach(([party, percentage]) => {
            if (party === "ALAND" && districtId !== "Aland") {
                return;
            }
            votes[party] = percentage;
        });
        const seats = {};
        Object.keys(votes).forEach(party => {
            seats[party] = 0;
        });
        for (let i = 0; i < totalSeats; i++) {
            let winningParty = null;
            let highestQuotient = -Infinity;

            Object.entries(votes).forEach(([party, vote]) => {
                const quotient = vote / (seats[party] + 1);
                if (quotient > highestQuotient) {
                    highestQuotient = quotient;
                    winningParty = party;
                }
            });
            seats[winningParty]++;
        }
        return seats;
    }

    function calculateNationalSeats() {
        const nationalSeats = {
            SDP:0,
            KESK:0,
            KOK:0,
            VAS:0,
            VIHR:0,
            RKP:0,
            SKL:0,
            ALAND:0,
        };

        document.querySelectorAll("#layer2 path").forEach(district => {
            const projectedSeats = calculateDistrictSeats(district.id);
            
            Object.entries(projectedSeats).forEach(([party,seats]) => {
                if (nationalSeats[party] !== undefined) {
                    nationalSeats[party] += seats;
                }
            });
        });

        return nationalSeats;
    }

    function getDistrictColor(district) {
        const projectedSeats = calculateDistrictSeats(district.id);
        if (!projectedSeats || Object.keys(projectedSeats).length === 0) {
            return "#CCCCCC";
        }
        const leadingParty = Object.entries(projectedSeats).filter(([party,seats]) => seats > 0) .sort((a,b) => b[1] - a[1])[0];

        if (!leadingParty) {
            return "#CCCCCC";
        }

        const party = leadingParty[0];
        return PARTY_COLORS[party] || "#CCCCCC";
    }

    function updateMapColors() {
        document.querySelectorAll("#layer2 path").forEach(district => {
            district.style.fill = getDistrictColor(district);
        })
    }

    function projectionsAvailable() {
        return gameState.turn < 31;
    }

    function updateParliamentMap() {
        const nationalSeats = calculateNationalSeats();
        const vacantGroup = document.getElementById("0-Vacant");
        if (!vacantGroup) return;
        const seats = vacantGroup.querySelectorAll("circle");

        let seatIndex = 0;

        Object.entries(nationalSeats).forEach(([party,seatCount]) => {
            const color = PARTY_COLORS[party];

            for (let i = 0; i < seatCount; i++) {
                if (seats[seatIndex]) {
                    seats[seatIndex].style.fill = color;
                }
                seatIndex++
            }
        });
    }

    function updateParliamentProjection() {
        const vacantGroup = document.getElementById("0-Vacant");
        if (!vacantGroup) return;

        const seats = vacantGroup.querySelectorAll("circle");
        if (!projectionsAvailable()) {
            seats.forEach(seat => {
                seat.style.fill = "#7f7f7f";
            });
            return;
        }
        const nationalSeats = calculateNationalSeats();
        let seatIndex = 0;
        Object.entries(nationalSeats).forEach(([party,seatCount]) => {
            const color = PARTY_COLORS[party] || "#7f7f7f";
            for (let i = 0; i < seatCount; i++) {
                if (seats[seatIndex]) {
                    seats[seatIndex].style.fill = color;
                }
                seatIndex++;
            }
        });
    }

    document.querySelectorAll("#layer2 path").forEach(district => {
        district.addEventListener("click", () => {
            showDistrictInfo(district);
        });
    });

    document.querySelectorAll(".buttonsforsmalldistricts button").forEach(button => {
        button.addEventListener("click", () => {
            const districtId = smallDistrictMap[button.id];
            const district = document.getElementById(districtId);

            if (district) {
                showDistrictInfo(district);
            }
        });
    });

    document.getElementById("rally").addEventListener("click", () => {
        const districtId = gameState.selectedDistrict;
        if (!districtId) {
            return alert("Select a district first!");
        }
        const cost = 50000;

        if (gameState.funds < cost) {
            return alert("Not enough funds!");
        }

        gameState.funds -= cost;

        const effect = Math.random() * 2 + 1;

        applyCampaignEffect(
            districtId,
            gameState.party,
            effect
        )

        updateFundsDisplay();
        updateMapColors();
        updateParliamentMap();
        updateParliamentProjection();
        showDistrictInfo(document.getElementById(districtId)
    );
    });

    document.getElementById("adbuy").addEventListener("click", () => {
        const cost = 120000;
        if (gameState.funds < cost) {
            return alert("Not enough funds!");
        }

        gameState.funds -= cost;

        const effect = Math.random() * 1.5 + 0.5;
        const playerParty = gameState.party;

        Object.keys(gameState.districtSupport).forEach(districtId => {
            applyCampaignEffect(
                districtId,
                gameState.party,
                effect,
            );
        });
        updateFundsDisplay();
        updateMapColors();
        updateParliamentMap();
        updateParliamentProjection();

        if (gameState.selectedDistrict) {
            const district = document.getElementById(
                gameState.selectedDistrict
            );
            if (district) {
                showDistrictInfo(district);
            }
        }
    });

    document.getElementById("canvassing").addEventListener("click", () => {
        const districtId = gameState.selectedDistrict;
        if (!districtId) {
            return alert("Select a district first!");
        }

        const cost = 30000;
        if (gameState.funds < cost) {
            return alert("Not enough funds!");
        }
        gameState.funds -= cost;

        const effect = Math.random() * 2.5 + 1.5;

        applyCampaignEffect(
            districtId,
            gameState.party,
            effect,
        );
        updateFundsDisplay();
        updateMapColors();
        updateParliamentMap();
        updateParliamentProjection();
        showDistrictInfo(
            document.getElementById(districtId)
        );
    });

    document.getElementById("leaflets").addEventListener("click", () => {
        const districtId = gameState.selectedDistrict;
        if (!districtId) {
            return alert("Select a district first!");
        }

        const cost = 15000;
        if (gameState.funds < cost) {
            return alert("Not enough funds!");
        }
        gameState.funds -= cost;

        const effect = Math.random() * 1 + 0.5;
        applyCampaignEffect(
            districtId,
            gameState.party,
            effect,
        );
        updateFundsDisplay();
        updateMapColors();
        updateParliamentMap();
        updateParliamentProjection();
        showDistrictInfo(
            document.getElementById(districtId)
        );
    });

    function applyCampaignEffect(districtId, party, effect) {
        const support = gameState.districtSupport[districtId];
        if (!support || support[party] === undefined) return;
        const minorConfig = MINOR_AI_CONFIG[party];
        let actualEffect = effect;

        support[party] += actualEffect;

        const otherParties = Object.keys(support).filter(
            p => p !== party
        );

        const totalOtherSupport = otherParties.reduce(
            (sum, p) => sum + support[p],
            0
        );

        if (totalOtherSupport > 0) {
            otherParties.forEach(p => {
                const share = support[p] / totalOtherSupport;
                let loss = effect * share;

                if (MINOR_AI_CONFIG[p]) {
                    const floor = getMinorSupportFloor(p, districtId);
                    const currentSupport = support[p];

                    if (currentSupport <= floor) {
                        loss = 0;
                    } else if (currentSupport <= floor + 5) {
                        loss *= 0.25;
                    } else if (currentSupport <= floor + 10) {
                        loss *= 0.60;
                    }

                    loss = Math.min(
                        loss,
                        Math.max(0, currentSupport - floor)
                    );
                }
                support[p] -= loss;
                support[p] = Math.max(0, support[p]);
            });
        }
    }

    document.getElementById("nextturn").addEventListener("click", () => {
        if (document.querySelector(".eventpopup").style.display !== "none") {
            alert("You must resolve the current event before continuing to the next turn!");
            return;
        }
        if (gameState.funds > 650000) {
            alert("You are holding far too much campaign cash. Spend it before continuing to the next turn.");
            return;
        }
        if (gameState.funds > 500000) {
            alert("Your campaign is accumulating unused funds. Consider spending it.");
        }

        if (gameState.debate.active) {
            alert("The debate is still in progress!");
            return;
        }

        if (gameState.turn === 19 && !gameState.triggeredEvents.includes("economy_debate_preparation")) {
            openEvent(ECONOMY_DEBATE_PREPARATION);
            return;
        }

        if (gameState.turn === 20 && !gameState.debateTriggered.economy) {
            startDebate("economy");
            return;
        }

        if (gameState.turn === 27 && !gameState.triggeredEvents.includes("eu_debate_preparation")) {
            openEvent(EU_DEBATE_PREPARATION);
            return;
        }

        if (gameState.turn === 28 && !gameState.debateTriggered.eu) {
            startDebate("eu");
            return;
        }

        gameState.turn += 1;

        if (gameState.turn > 36) {
            alert("Election night is now starting!")
            startElectionNight();
            return;
        }

        if (gameState.turn === 30) {
            alert("Polling blackout will start after this turn. You will no longer see the national and district seat projections.")
        }

        if (gameState.turn === 11 || gameState.turn === 12) {
            triggerPolicyEvent();
            return;
        }

        if (gameState.turn === 25 || gameState.turn === 26) {
            triggerPolicyEvent();
            return;
        }

        if (gameState.turn === 31 || gameState.turn === 32) {
            triggerPolicyEvent();
            return;
        }

        if (Math.random() < 0.2) {
            triggerRandomEvent();
        }

        gameState.funds += 100000;
        runOpponentTurn();
        applyDistrictDrift();
        updateFundsDisplay();
        updateMapColors();
        updateParliamentProjection();
        updateTurnCounter();
    })

    function applyDistrictDrift() {
        Object.entries(gameState.districtSupport).forEach(([districtId, support]) => {
            const parties = Object.keys(support);
            if (parties.length < 2) return;
            const effect = Math.random() * 0.3 + 0.05;
            const gainingParty = parties[Math.floor(Math.random() * parties.length)];
            let losingParty = parties[Math.floor(Math.random() * parties.length)];
            while (losingParty === gainingParty) {
                losingParty = parties[Math.floor(Math.random() * parties.length)];
            }

            const acctualEffect = Math.min(
                effect,
                support[losingParty]
            );

            support[gainingParty] += acctualEffect;
            support[losingParty] -= acctualEffect;
        });
        updateMapColors();
        updateParliamentMap();
        if (gameState.selectedDistrict) {
            const district = document.getElementById(gameState.selectedDistrict);
            if (district) {
                showDistrictInfo(district);
            }
        }
    }

    // EVENTS SPECIFICALLY DEBATES

    function startDebate(debateId) {
        const debate = DEBATES[debateId];

        if (!debate) {
            console.error(`Debate "${debateId}" not found`);
            return;
        }
        gameState.debateTriggered[debateId] = true;
        gameState.debate = {
            active:true,
            id:debateId,
            topic:debate.topic,
            round:0,
            playerScore:0,
            totalRounds:debate.questions.length
        };

        document.querySelector(".debateevent").style.display = "block";
        document.querySelector(".eventpopup").style.display = "none";
        document.getElementById("debatetopic").textContent = debate.topic;
        document.getElementById("debaterounds").textContent = `1 out of ${debate.questions.length}`;

        document.getElementById("AhoResponse").textContent = "None";
        document.getElementById("LipponenResponse").textContent = "None";
        document.getElementById("NiinistoResponse").textContent = "None";

        loadDebateRound();
        resetDebateButtons();
    }

    function loadDebateRound() {
        const debate = DEBATES[gameState.debate.id];
        const round = gameState.debate.round;
        const currentQuestion = debate.questions[round];

        if (!currentQuestion) {
            finishDebate();
            return;
        }

        document.getElementById("debatequestion").textContent = currentQuestion.question;
        document.getElementById("debaterounds").textContent = `${round + 1} out of ${debate.questions.length}`;
        document.getElementById("debateoption1").textContent = currentQuestion.options[0].text;
        document.getElementById("debateoption2").textContent = currentQuestion.options[1].text;
        document.getElementById("debateoption3").textContent = currentQuestion.options[2].text;

        document.getElementById("AhoResponse").textContent = "Waiting...";
        document.getElementById("LipponenResponse").textContent = "Waiting...";
        document.getElementById("NiinistoResponse").textContent = "Waiting...";

        document.getElementById("debateoption1").onclick = () => {
            answerDebateQuestion(0);
        };
        document.getElementById("debateoption2").onclick = () => {
            answerDebateQuestion(1);
        };
        document.getElementById("debateoption3").onclick = () => {
            answerDebateQuestion(2);
        };
    }

    function answerDebateQuestion(optionIndex) {
        const debate = DEBATES[gameState.debate.id];
        const currentRound = gameState.debate.round;
        const question = debate.questions[currentRound];
        const selectedOption = question.options[optionIndex];
        if (!selectedOption) return;

        let score = selectedOption.score;

        const preparation = gameState.debatePreparation[gameState.debate.id];
        if (
            preparation &&
            selectedOption.type &&
            preparation === selectedOption.type
        ) {
            score += 1;
            console.log(
                "preparation bonus applied:",
                preparation
            );
        }
        gameState.debate.playerScore += score;
        updateDebateResponses(selectedOption);
        document.querySelectorAll(".debateevent button").forEach(button => {
            button.disabled = true;
        });

        setTimeout(() => {
            gameState.debate.round++;
            if (gameState.debate.round >= debate.questions.length) {
                finishDebate();
            } else {
                document.querySelectorAll(".debateevent button").forEach(button => {
                    button.disabled = false;
                });
                loadDebateRound();
            }
        }, 5000)
    }

    
    function resetDebateButtons() {
        document.querySelectorAll(".debateevent button").forEach(button => {
            button.disabled = false;
        })
    }

    function updateDebateResponses(playerOption) {
        const playerParty = gameState.party;
        const debateId = gameState.debate.id;

        const responses = {
            KESK: {
                response: playerParty === "KESK" ? playerOption.text : getOpponentResponse(debateId, "KESK")
            },
            SDP: {
                response: playerParty === "SDP" ? playerOption.text : getOpponentResponse(debateId, "SDP")
            },
            KOK: {
                response: playerParty === "KOK" ? playerOption.text : getOpponentResponse(debateId, "KOK")
            }
        };
        document.getElementById("AhoResponse").textContent = responses.KESK.response;
        document.getElementById("LipponenResponse").textContent = responses.SDP.response;
        document.getElementById("NiinistoResponse").textContent = responses.KOK.response;
    }

    function getOpponentResponse(debateId, partyId) {
        const responses = {
            economy:{
                KESK:[
                    "Finland needs a policy that restores confidence and creates jobs.",
                    "The government must take responsibility for economic recovery.",
                    "We cannot abandon ordinary Finns during this crisis."
                ],
                SDP:[
                    "Finland needs a government prepared to take decisive action.",
                    "Economy recovery cannot come at the expense of working people.",
                    "The country needs change, not excuses."
                ],
                KOK:[
                    "Finland cannot continue accumulating debt indefinitely.",
                    "Difficult economic decisions cannot be avoided.",
                    "Restoring confidence in Finland's economy must be the priority."
                ]
            },
            eu:{
                KESK:[
                    "Finland must ensure that its voice is heard in the new Europe.",
                    "European cooperation must serve Finland's national interests.",
                    "We must protect Finnish decision-making while working with our European partners."
                ],
                SDP:[
                    "Finland must be prepared to participate actively in European decision-making.",
                    "European cooperation must also protect employment and social security.",
                    "Finland's future cannot be built by standing on the sidelines."
                ],
                KOK:[
                    "Finland must take advantage of the opportunities offered by European integration.",
                    "Economic openness and European cooperation are essential to Finland's future.",
                    "Finland needs influence in Europe, not isolation from it."
                ]
            }
        };

        const partyResponses = responses[debateId]?.[partyId];
        if (!partyResponses) {
            console.warn(`No opponent response found for ${debateId} / ${partyId}`);
            return "No response";
        }
        return partyResponses[
            Math.floor(Math.random() * partyResponses.length)
        ];
    }

    function finishDebate() {
        const score = gameState.debate.playerScore;
        let result;
        
        if (score >= 6) {
            result = "excellent";
            applyNationalPartySwing(gameState.party, 1);
        } else if (score >= 4) {
            result = "strong";
            applyNationalPartySwing(gameState.party, 0.75);
        } else if (score >= 2) {
            result = "mixed";
            applyNationalPartySwing(gameState.party, 0.25);
        } else {
            result = "poor";
            applyNationalPartySwing(gameState.party, -0.5);
        }
        gameState.debate.active = false;
        alert(
            `The debate has concluded\n\n` +
            `Your performance was judged to be ${result}`
        );
        document.querySelector(".debateevent").style.display = "none";
    }

    const ECONOMY_DEBATE_PREPARATION = {
        id:"economy_debate_preparation",
        once:true,
        text:"The first major televised debate is approaching. The debate focus on Finland's economy and the recession. How should your campaign prepare?",
        option1:{
            text:"Prepare detailed economic arguments",
            effect:() => {
                gameState.debatePreparation.economy = "policy";
            }
        },
        option2:{
            text:"Focus on connecting with struggling voters",
            effect:() => {
                gameState.debatePreparation.economy = "empathy";
            }
        },
        option3:{
            text:"Prepare aggressive attacks against your opponents",
            effect:() => {
                gameState.debatePreparation.economy = "attack";
            }
        }
    }

    const EU_DEBATE_PREPARATION = {
        id:"eu_debate_preparation",
        once:true,
        text:"The second major televised debate is approaching, with Finland's entry to the European Union already happened, the debate is expected to focus on membership, sovereignty and Finland's future foreign policy. How should your campaign prepare?",
        option1:{
            text:"Prepare detailed arguments about Finland's role in European integration",
            effect:() => {
                gameState.debatePreparation.eu = "integration";
            }
        },
        option2:{
            text:"Focus on Finnish sovereignty and national decision-making",
            effect:() => {
                gameState.debatePreparation.eu = "sovereignty";
            }
        },
        option3:{
            text:"Prepare practical arguments about economic consequences of membership",
            effect:() => {
                gameState.debatePreparation.eu = "pragmatism";
            }
        }
    }

    const DEBATES = {
        economy:{
            topic:"The Finnish Economy",
            questions:[
                {
                    question:"How should Finland respond to the continuing economic recession?",
                    options:[
                        {
                            text:"The priority must be a responsible programme of economic reform",
                            type:"policy",
                            score:2
                        },
                        {
                            text:"We must protect Finns suffering from unemployment and hardship",
                            type:"empathy",
                            score:2
                        },
                        {
                            text:"My opponents have failed Finland and cannot be trusted with its recovery",
                            type:"attack",
                            score:2
                        }
                    ]
                },
                {
                    question:"How should the next government address unemployment?",
                    options:[
                        {
                            text:"Expand employment programmes",
                            type:"empathy",
                            score:2
                        },
                        {
                            text:"Encourage private-sector growth",
                            type:"policy",
                            score:2
                        },
                        {
                            text:"Focus on long-term economic reforms",
                            type:"policy",
                            score:1
                        }
                    ]
                },
                {
                    question:"Should Finland introduce further austerity measures?",
                    options:[
                        {
                            text:"Yes, difficult decisions are necessary to restore Finland's finances",
                            type:"policy",
                            score:2
                        },
                        {
                            text:"No, further cuts would risk damaging the recovery and increase unemployment",
                            type:"empathy",
                            score:2
                        },
                        {
                            text:"Only if absolutely necessary",
                            type:"policy",
                            score:1
                        }
                    ]
                }
            ]
        },
        eu:{
            topic:"Finland and the European Union",
            questions:[
                {
                    question:"What should Finland's relationship with the European Union look like?",
                    options:[
                        {
                            text:"Finland should take an active role in shaping Europe's future",
                            type:"integration",
                            score:2
                        },
                        {
                            text:"European cooperation must never come at the expense of Finnish sovereignty",
                            type:"sovereignty",
                            score:2
                        },
                        {
                            text:"Membership should be judged by whether it strengthens Finland's economy and security",
                            type:"pragmatism",
                            score:2
                        }
                    ]
                },
                {
                    question:"How should Finland respond if EU policies conflict with domestic priorities?",
                    options:[
                        {
                            text:"Finland should work with its European partners to influence policy from within",
                            type:"integration",
                            score:2
                        },
                        {
                            text:"The Eduskunta must retain the final authority over matters affecting Finland",
                            type:"sovereignty",
                            score:2
                        },
                        {
                            text:"Each issue should be considered according to Finland's practical national interests",
                            type:"pragmatism",
                            score:2
                        }
                    ]
                },
                {
                    question:"What does European Union membership mean for Finland's future?",
                    options:[
                        {
                            text:"It gives Finland an opportunity to become a full participant in European decision-making",
                            type:"integration",
                            score:2
                        },
                        {
                            text:"It makes protecting Finland's independence and national identity more important than ever",
                            type:"sovereignty",
                            score:2
                        },
                        {
                            text:"It is a tool that Finland must use carefully to secure prosperity and stability",
                            type:"pragmatism",
                            score:2
                        }
                    ]
                }
            ]
        }
    }

    // ===== EVENTS =====

    const EVENTS = [
        {
            id:"bad_weather",
            type:"generic",
            text:"Bad weather forces your campaign to cancel several events across multiple districts. How do you respond?",
            option1: {
                text:"Reschedule the events",
                effect:() => {
                    addFunds(-75000);
                    applyRandomDistrictPartySwing(gameState.party, 0.75);
                }
            },
            option2: {
                text:"Shift to media appearances instead",
                effect:() => {
                    applyNationalPartySwing(gameState.party, 0.4);
                }
            }
        },
        {
            id:"large_crowd",
            type:"generic",
            text:"A campaign rally unexpectedly draws a large crowd. Hundreds of supporters turn out significantly for your campaign event. The images make their way into the evening news.",
            option1: {
                text:"Thank you!",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, 0.6);
                }
            }
        },
        {
            id:"embarrassing_turnout",
            type:"generic",
            text:"A campaign rally has attracted considerably fewer people than expected. Opposition parties are portraying that your campaign lacks any momentum.",
            option1:{
                text:"Bummer...",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, -0.4);
                }
            }
        },
        {
            id:"strong_television_appearance",
            type:"generic",
            text:"Your party leader makes a strong television appearance, performing particularly well during a televised interview. Analysts describe the performance as convincing and strong.",
            option1:{
                text:"Yay",
                effect:() => {
                    applyNationalPartySwing(gameState.party, 0.4);
                }
            }
        },
        {
            id:"weak_television_appearance",
            type:"generic",
            text:"In a televised interview, the interviewer catches your party leader offguard with questions about an unpopular policy. The clip receives considerable attention.",
            option1:{
                text:"Bummer...",
                effect:() => {
                    applyNationalPartySwing(gameState.party, -0.4);
                }
            }
        },
        {
            id:"leader_exhaustion",
            type:"generic",
            text:"After weeks of campaigning, your party leader is visibly exhausted. Advisors disagree whether or not that the leader should maintain the campaign scheduling or slow down. How do you respond?",
            option1:{
                text:"Reduce the schedule",
                effect:() => {
                    addFunds(30000);
                }
            },
            option2:{
                text:"Keep campaigning",
                effect:() => {
                    addFunds(-30000);
                    applyNationalPartySwing(gameState.party, 0.15);
                }
            }
        },
        {
            id:"volunteer_surge",
            type:"generic",
            text:"A surge of volunteers arrives at your campaign offices. Your organisers believe that they could make good use of the additional manpower.",
            option1:{
                text:"Yay",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, 0.3);
                }
            }
        },
        {
            id:"turnout_fundraising_rally",
            type:"generic",
            text:"A party fundraising drive has attracted a large crowd, to which hundreds of supporters have gone and donated.",
            option1:{
                text:"Yay",
                effect:() => {
                    addFunds(50000);
                    applyRandomDistrictPartySwing(gameState.party, 0.1);
                }
            }
        },
        {
            id:"turnout_low_fundraising_rally",
            type:"generic",
            text:"A party fundraising drive has attracted considerably few people than expected. Aw",
            option1:{
                text:"Bummer...",
                effect:() => {
                    addFunds(15000);
                }
            }
        },
        {
            id:"leaked_info",
            type:"generic",
            text:"Your campaign receives information regarding plans from one of the major parties. Your advisors believe that using the information could give your campaign an advantage, but may harm relations after the elections. How do you respond?",
            option1:{
                text:"Use the information",
                effect:() => {
                    const target = randomOtherMajorParty();
                    if (target) {
                        changePartyRelation(gameState.party, target, -2);
                    }
                    applyNationalPartySwing(gameState.party, 0.2);
                }
            },
            option2:{
                text:"Keep things confidential",
                effect:() => {
                    const target = randomOtherMajorParty();
                    if (target) {
                        changePartyRelation(gameState.party, target, 2);
                    }
                }
            }
        },
        {
            id:"cross_party_collaboration",
            type:"generic",
            text:"A senior politician from another party has privately approached your campaign and suggest cooperation after the election may be possible. How do you respond?",
            option1:{
                text:"Welcome the proposal",
                effect:() => {
                    const target = randomOtherMajorParty();
                    if (target) {
                        changePartyRelation(gameState.party, target, 3);
                    }
                }
            },
            option2:{
                text:"Keep your distance",
                effect:() => {
                    const target = randomOtherMajorParty();
                    if (target) {
                        changePartyRelation(gameState.party, target, -1);
                    }
                }
            }
        },
        {
            id:"offhand_comment",
            type:"generic",
            text:"After finishing a television interview, your party leader makes an offhanded comment regarding another party leader. Unfortunately, the microphone is still recording. How do you respond?",
            option1:{
                text:"Apologise profusely",
                effect:() => {
                    applyNationalPartySwing(gameState.party, -0.2);
                    const target = randomOtherMajorParty();
                    if (target) {
                        changePartyRelation(gameState.party, target, -2);
                    }
                }
            },
            option2:{
                text:"Claim the statement was made out of context",
                effect:() => {
                    applyNationalPartySwing(gameState.party, -0.4);
                    const target = randomOtherMajorParty();
                    if (target) {
                        changePartyRelation(gameState.party, target, -4);
                    }
                }
            }
        },
        {
            id:"wrong_turn",
            type:"generic",
            text:"The campaign bus took a wrong turn and stopped at a town that was not on the campaign itinerary. What do you do?",
            option1:{
                text:"Hold an improvised rally",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, 0.3);
                }
            },
            option2:{
                text:"Tell the driver to go back and return to the route",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, -0.3);
                }
            }
        },
        {
            id:"wrong_name",
            type:"generic",
            text:"During a campaign stop, your party leader confidently addresses a local candidate by the wrong name. What do you do?",
            option1:{
                text:"Apologize",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, -0.15);
                }
            },
            option2:{
                text:"Pretend that the mistake didn't happen",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, -0.3);
                }
            }
        },
        {
            id:"volunteers_organise_independently",
            type:"generic",
            text:"Local supporters have started organising campaign activities without any direct instructions from the campaign party headquarters.",
            option1:{
                text:"Yay",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, 0.5);
                }
            }
        },
        {
            id:"materials_mistake",
            type:"generic",
            text:"While distributing campaign materials across districts, a logistical error has left campaign materials distributed inefficiently and unequally.",
            option1:{
                text:"Oops",
                effect:() => {
                    addFunds(-25000);
                    applyRandomDistrictPartySwing(gameState.party, -0.3);
                }
            }
        },
        {
            id:"polling_bad",
            type:"generic",
            text:"A new poll has raised some concern among your campaign managers, with the polls suggesting your party is struggling among multiple districts. You must decide whether your campaign will react publicly.",
            option1:{
                text:"Dismiss the poll",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, -0.5);
                }
            },
            option2:{
                text:"Launch an aggressive campaign response",
                effect:() => {
                    applyRandomDistrictPartySwing(gameState.party, 1);
                    addFunds(-60000);
                }
            }
        },
        {
            id:"policy_economic_recovery",
            type:"policy/party_relations",
            once:true,
            text:"Finland's economy remains at the centre of the election campaign, especially with the recession at its forefront. What position will your party take?",
            option1:{
                text:"Make rapid economic growth the priority",
                effect:() => {
                    changePartyRelation(gameState.party, "KOK", 10);
                    changePartyRelation(gameState.party, "KESK", 5);
                    changePartyRelation(gameState.party, "SDP", -5);
                    changePartyRelation(gameState.party, "VAS", -10)
                }
            },
            option2:{
                text:"Protect employment and prioritize social protection",
                effect:() => {
                    changePartyRelation(gameState.party, "SDP", 10);
                    changePartyRelation(gameState.party, "VAS", 6);
                    changePartyRelation(gameState.party, "KOK", -5);
                    changePartyRelation(gameState.party, "KESK", -2);
                }
            },
            option3:{
                text:"Balance a mix of growth and protection",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 10);
                    changePartyRelation(gameState.party, "SDP", 5);
                    changePartyRelation(gameState.party, "KOK", 5);
                    changePartyRelation(gameState.party, "VAS", 3);
                    changePartyRelation(gameState.party, "VIHR", 3);
                    changePartyRelation(gameState.party, "RKP", 2);
                }
            }
        },
        {
            id:"policy_EU_admission",
            type:"policy/party_relations",
            once:true,
            text:"In January 1st, 1995, Finland joined the European Union. The accession in the European Union has remained a major centre of the campaign. What position will your party take?",
            option1:{
                text:"Finland joining the EU is good",
                effect:() => {
                    changePartyRelation(gameState.party, "KOK", 10);
                    changePartyRelation(gameState.party, "SDP", 7);
                    changePartyRelation(gameState.party, "RKP", 7);
                    changePartyRelation(gameState.party, "KESK", 2);
                    changePartyRelation(gameState.party, "VAS", -10);
                    changePartyRelation(gameState.party, "ALAND", 5);
                    changePartyRelation(gameState.party, "SKL", -10);
                }
            },
            option2:{
                text:"Finland should've remained out the EU",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 5);
                    changePartyRelation(gameState.party, "VAS", 9);
                    changePartyRelation(gameState.party, "KOK", -9);
                    changePartyRelation(gameState.party, "SDP", -7);
                    changePartyRelation(gameState.party, "SKL", 7);
                }
            },
            option3:{
                text:"Support membership, but demand strong protection for Finnish interests",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 10);
                    changePartyRelation(gameState.party, "KOK", 5);
                    changePartyRelation(gameState.party, "SDP", 5);
                }
            }
        },
        {
            id:"policy_austerity_measures",
            type:"policy/party_relations",
            once:true,
            text:"Aho's government has committed to a policy of austerity and it remains a central issue of the election. What position will your party take?",
            option1:{
                text:"Deep spending cuts are necessary",
                effect:() => {
                    changePartyRelation(gameState.party, "KOK", 10);
                    changePartyRelation(gameState.party, "KESK", 4);
                    changePartyRelation(gameState.party, "SDP", -9);
                    changePartyRelation(gameState.party, "VAS", -10);
                    changePartyRelation(gameState.party, "VIHR", -5);
                    changePartyRelation(gameState.party, "SKL", 3);
                }
            },
            option2:{
                text:"Cuts should be limited to inefficient government spending",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 10);
                    changePartyRelation(gameState.party, "KOK", 4);
                    changePartyRelation(gameState.party, "SDP", 4);
                    changePartyRelation(gameState.party, "VIHR", 3);
                    changePartyRelation(gameState.party, "SKL", 5);
                }
            },
            option3:{
                text:"Social spending should be protected",
                effect:() => {
                    changePartyRelation(gameState.party, "SDP", 10);
                    changePartyRelation(gameState.party, "VAS", 10);
                    changePartyRelation(gameState.party, "KESK", -5);
                    changePartyRelation(gameState.party, "KOK", -10);
                    changePartyRelation(gameState.party, "VIHR", 8);
                    changePartyRelation(gameState.party, "SKL", 4);
                }
            }
        },
        {
            id:"policy_public_debt",
            type:"policy/party_relations",
            once:true,
            text:"The recession has left a significant amount of central government debt to balloon significantly, making it a central part of the campaign. What position will your party take?",
            option1:{
                text:"Debt reduction must be a government priority",
                effect:() => {
                    changePartyRelation(gameState.party, "KOK", 10);
                    changePartyRelation(gameState.party, "KESK", 4);
                    changePartyRelation(gameState.party, "SDP", -5);
                }
            },
            option2:{
                text:"Reduce debt gradually while supporting recovery",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 9);
                    changePartyRelation(gameState.party, "SDP", 5);
                    changePartyRelation(gameState.party, "KOK", 3);
                    changePartyRelation(gameState.party, "VAS", 3);
                    changePartyRelation(gameState.party, "VIHR", 4);
                }
            },
            option3:{
                text:"Borrowing is justified if it protects employment",
                effect:() => {
                    changePartyRelation(gameState.party, "SDP", 10);
                    changePartyRelation(gameState.party, "VAS", 7);
                    changePartyRelation(gameState.party, "KOK", -10);
                    changePartyRelation(gameState.party, "KESK", -2);
                    changePartyRelation(gameState.party, "VIHR", 5);
                }
            }
        },
        {
            id:"policy_swedish_finns",
            type:"policy/party_relations",
            once:true,
            text:"The issues of Swedish-Finnish residents are not exactly a large issue this election, but the RKP represents them. What position will your party take?",
            option1:{
                text:"Strengthen protection for Swedish-speaking Finns",
                effect:() => {
                    changePartyRelation(gameState.party, "RKP", 15);
                    changePartyRelation(gameState.party, "ALAND", 12);
                    changePartyRelation(gameState.party, "SDP", 2);
                    changePartyRelation(gameState.party, "KESK", 2);
                    changePartyRelation(gameState.party, "KOK", 2);
                }
            },
            option2:{
                text:"Maintain the existing language arrangements",
                effect:() => {
                    changePartyRelation(gameState.party, "RKP", 7);
                    changePartyRelation(gameState.party, "ALAND", 7);
                }
            },
            option3:{
                text:"Finnish should have a stronger role in public administration",
                effect:() => {
                    changePartyRelation(gameState.party, "RKP", -15);
                    changePartyRelation(gameState.party, "ALAND", -15);
                }
            }
        },
        {
            id:"policy_bailouts",
            type:"policy/party_relations",
            once:true,
            text:"As part of the recession, the banks have fallen into a crisis and requiring state assistance. There has been debates regarding whether the government should rescue struggling institutions. What position will your party take?",
            option1:{
                text:"The government must intervene to prevent further economic damage",
                effect:() => {
                    changePartyRelation(gameState.party, "SDP", 10);
                    changePartyRelation(gameState.party, "VAS", 10);
                    changePartyRelation(gameState.party, "KESK", 4);
                    changePartyRelation(gameState.party, "KOK", 2);
                }
            },
            option2:{
                text:"Rescue them, but impose strict conditions",
                effect:() => {
                    changePartyRelation(gameState.party, "KOK", 6);
                    changePartyRelation(gameState.party, "KESK", 6);
                    changePartyRelation(gameState.party, "SDP", 3);
                    changePartyRelation(gameState.party, "VIHR", 4);
                    changePartyRelation(gameState.party, "VAS", 1);
                }
            },
            option3:{
                text:"The government should not be rescuing failing businesses",
                effect:() => {
                    changePartyRelation(gameState.party, "KOK", 10);
                    changePartyRelation(gameState.party, "KESK", 2);
                    changePartyRelation(gameState.party, "SDP", -10);
                    changePartyRelation(gameState.party, "VAS", -10);
                }
            }
        },
        {
            id:"policy_constitution_after_EU",
            type:"policy/party_relations",
            once:true,
            text:"Because of European integration, there has been questions about what it means for Finnish sovereignty and constitutional arrangements, making it a significant issue of this election. What position will your party take?",
            option1:{
                text:"Parliament must remain strong control over EU affairs",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 8);
                    changePartyRelation(gameState.party, "SDP", 4);
                    changePartyRelation(gameState.party, "KOK", -3);
                    changePartyRelation(gameState.party, "SKL", -10);
                }
            },
            option2:{
                text:"European integration requires adapting Finland's constitutional arrangements",
                effect:() => {
                    changePartyRelation(gameState.party, "KOK", 10);
                    changePartyRelation(gameState.party, "SDP", 7);
                    changePartyRelation(gameState.party, "RKP", 5);
                    changePartyRelation(gameState.party, "KESK", -5);
                    changePartyRelation(gameState.party, "SKL", -10);
                }
            },
            option3:{
                text:"Any major constitutional changes should require broad parliamentary consensus",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 10);
                    changePartyRelation(gameState.party, "SDP", 5);
                    changePartyRelation(gameState.party, "KOK", 5);
                    changePartyRelation(gameState.party, "VAS", 5);
                    changePartyRelation(gameState.party, "SKL", 7);
                }
            }
        },
        {
            id:"policy_foreign_policy",
            type:"policy/party_relations",
            once:true,
            text:"After the dissolution of the Soviet Union in 1991, Finland is no longer tied to the forced neutrality in the YYA treaty and this gives her a new opportunity for her foreign policy. What position will your party take?",
            option1:{
                text:"Finland should deepen its integration with Western Europe",
                effect:() => {
                    changePartyRelation(gameState.party, "KOK", 10);
                    changePartyRelation(gameState.party, "SDP", 7);
                    changePartyRelation(gameState.party, "RKP", 6);
                    changePartyRelation(gameState.party, "ALAND", 7);
                }
            },
            option2:{
                text:"Finland should maintain an independent and pragmatic foreign policy",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 10);
                    changePartyRelation(gameState.party, "SDP", 5);
                    changePartyRelation(gameState.party, "SKL", 8);
                    changePartyRelation(gameState.party, "VIHR", 6);
                }
            },
            option3:{
                text:"Finland should prioritise neutrality and independence",
                effect:() => {
                    changePartyRelation(gameState.party, "KESK", 10);
                    changePartyRelation(gameState.party, "VAS", 6);
                    changePartyRelation(gameState.party, "KOK", -8)
                }
            }
        }
    ]

    function openEvent(event) {
        const popup = document.querySelector(".eventpopup");
        popup.style.display = "block";
        document.querySelector(".eventtext").textContent = event.text;
        updateEventLogo();

        const option1 = document.getElementById("option1");
        const option2 = document.getElementById("option2");
        const option3 = document.getElementById("option3");
        option1.style.display = "none";
        option2.style.display = "none";
        option3.style.display = "none";

        if (event.option1) {
            option1.style.display = "block";
            option1.textContent = event.option1.text;
            option1.onclick = () => {
                event.option1.effect();
                resolveEvent(event);
            };
        }
        if (event.option2) {
            option2.style.display = "block";
            option2.textContent = event.option2.text;
            option2.onclick = () => {
                event.option2.effect();
                resolveEvent(event);
            }
        }
        if (event.option3) {
            option3.style.display = "block";
            option3.textContent = event.option3.text;
            option3.onclick = () => {
                event.option3.effect();
                resolveEvent(event);
            }
        }
    }

    function updateEventLogo() {
        const logo = document.getElementById("changeLogoDependOnCand");
        const partyLogo = PARTY_LOGO[gameState.party];
        if (partyLogo) {
            logo.src = partyLogo;
        }
    }

    function updateCoalitionLogo() {
        const logo = document.getElementById("changeLogoDependOnParty");
        const partyLogo = PARTY_LOGO[gameState.party];
        if (partyLogo) {
            logo.src = partyLogo;
        }
    }

    function triggerRandomEvent() {
        const validEvents = EVENTS.filter(event => {
            if (event.type === "policy/party_relations") {
                return false;
            }
            if (event.party && event.party !== gameState.party) {
                return false;
            }
            if (event.once && gameState.triggeredEvents.includes(event.id)) {
                return false;
            }
            return true;
        });
        if (validEvents.length === 0) return;
        const event = validEvents[Math.floor(Math.random() * validEvents.length)];
        openEvent(event);
    }

    function resolveEvent(event) {
        if (event.once && !gameState.triggeredEvents.includes(event.id)) {
            gameState.triggeredEvents.push(event.id);
        }

        closeEvent();

        updateFundsDisplay();
        updateMapColors();
        updateParliamentMap();
        updateParliamentProjection();

        if (gameState.selectedDistrict) {
            const district = document.getElementById(
                gameState.selectedDistrict
            );
            if (district) {
                showDistrictInfo(district);
            }
        }
    }

    function closeEvent() {
        document.querySelector(".eventpopup").style.display = "none";
    }

    function triggerPolicyEvent() {
        const validEvents = EVENTS.filter(event => {
            if (event.type !== "policy/party_relations") return false;
            if (event.once && gameState.triggeredEvents.includes(event.id)) return false;
            return true;
        });
        if (validEvents.length === 0) return;
        const event = validEvents[Math.floor(Math.random() * validEvents.length)];
        openEvent(event);
    }

    // ----- EVENT EFFECTS -----

    function applyNationalPartySwing(partyId, amount) {
        Object.keys(gameState.districtSupport).forEach(districtId => {
            const support = gameState.districtSupport[districtId];
            if (!support || support[partyId] === undefined) return;

            support[partyId] += amount;
            support[partyId] = Math.max(0, Math.min(100, support[partyId]));
        });
        updateMapColors();
        updateParliamentMap();
        updateParliamentProjection();
        if (gameState.selectedDistrict) {
            const district = document.getElementById(gameState.selectedDistrict);
            if (district) showDistrictInfo(district);
        }
    }

    function applyDistrictPartySwing(districtId, partyId, amount) {
        const support = gameState.districtSupport[districtId];
        if (!support || support[partyId] === undefined) return;
        support[partyId] += amount;
        support[partyId] = Math.max(
            0,
            Math.min(100, support[partyId])
        );

        updateMapColors();
        updateParliamentMap();
        updateParliamentProjection();

        if (gameState.selectedDistrict === districtId) {
            const district = document.getElementById(districtId);
            if (district) {
                showDistrictInfo(district);
            }
        }
    }

    function applyRandomDistrictPartySwing(partyId, amount) {
        const districts = Object.keys(gameState.districtSupport);
        if (districts.length === 0) return;
        const district = districts[Math.floor(Math.random() * districts.length)];
        applyDistrictPartySwing(district,partyId,amount);
    }

    function changePartyRelation(partyA, partyB, amount) {
        if (partyA === partyB) return;
        if (!gameState.partyRelations[partyA]) return;
        if (!gameState.partyRelations[partyB]) return;
        if (gameState.partyRelations[partyA][partyB] === undefined) return;

        gameState.partyRelations[partyA][partyB] += amount;
        gameState.partyRelations[partyB][partyA] += amount;

        gameState.partyRelations[partyA][partyB] = Math.max(
            -100,
            Math.min(100, gameState.partyRelations[partyA][partyB])
        );
        gameState.partyRelations[partyB][partyA] = Math.max(
            -100,
            Math.min(100, gameState.partyRelations[partyB][partyA])
        );
    }

    function addFunds(amount) {
        gameState.funds += amount;
        updateFundsDisplay();
    }

    function isPlayerParty(partyId) {
        return gameState.party === partyId;
    }

    function getPartySeats(partyId) {
        return gameState.electionNight.seats[partyId] || 0;
    }

    function getOtherMajorParties() {
        return MAJOR_PARTIES.filter(partyId => partyId !== gameState.party);
    }

    function randomOtherMajorParty() {
        const parties = getOtherMajorParties();
        if (parties.length === 0) return null;
        return parties[Math.floor(Math.random() * parties.length)];
    }

    // Election Night
    function startElectionNight() {
        document.getElementById("campaigninfo").style.display = "none";
        document.getElementById("electionnightinfo").style.display = "block";
        
        document.querySelectorAll("#layer2 path").forEach(district => {
            district.style.fill = "#808080";
        });

        const vacantGroup = document.getElementById("0-Vacant");
        if (vacantGroup) {
            vacantGroup.querySelectorAll("circle").forEach(seat => {
                seat.style.fill = "#7f7f7f";
            });
        }

        gameState.electionNight = {
            calledDistricts: [],
            seats: {}
        };

        Object.keys(PARTY_COLORS).forEach(party => {
            gameState.electionNight.seats[party] = 0;
        });
        updateElectionNightDisplay();
        callNextDistrict();
    }

    const ELECTION_NIGHT_ORDER = [
        "Aland",
        "Helsinki-Metro",
        "Uusimaa",
        "Varsinais-Suomi",
        "Satakunta",
        "Hame",
        "Pirkanmaa",
        "Kymi",
        "South-Savo",
        "North-Savo",
        "North-Karelia",
        "Central-Finland",
        "Vaasa",
        "Oulu",
        "Lapland"
    ]

    function callNextDistrict() {
        const called = gameState.electionNight.calledDistricts.length;
        if (called >= ELECTION_NIGHT_ORDER.length) {
            finishElectionNight();
            return;
        }

        const districtId = ELECTION_NIGHT_ORDER[called];
        setTimeout(() => {
            callDistrict(districtId);
        }, 1500);
    }

    function callDistrict(districtId) {
        const district =  document.getElementById(districtId);

        if (!district) {
            console.warn("Could not find district:", districtId);
            callNextDistrict();
            return;
        }

        const result = calculateDistrictSeats(districtId);
        gameState.electionNight.calledDistricts.push(districtId);

        Object.entries(result).forEach(([party,seats]) => {
            if (gameState.electionNight.seats[party] === undefined) {
                gameState.electionNight.seats[party] = 0;
            }
            gameState.electionNight.seats[party] += seats;
        });

        const winner = Object.entries(result).sort((a,b) => b[1] - a[1])[0];
        if (winner) {
            district.style.fill = PARTY_COLORS[winner[0]] || "#7f7f7f";
        }
        updateElectionNightDisplay();
        updateParliamentMapElectionNight();
        updateElectionPrediction(districtId);
        updateElectionNightPartyOrder();
        callNextDistrict();
    }

    function finishElectionNight() {
        const seats = gameState.electionNight.seats;
        const sortedParties = Object.entries(seats).sort((a, b) => b[1] - a[1]);
        const winner = sortedParties[0];

        if (!winner) {
            console.warn("Could not determine election winner.");
            return;
        }

        const winningParty = winner[0];
        const winningSeats = winner[1];
        updateElectionNightDisplay();
        updateParliamentMapElectionNight();
        updateElectionNightPartyOrder();

        const prediction = document.getElementById("prediction");

        if (prediction) {
            prediction.textContent = `${winningParty} has won the most seats and now has the opportunity to form a government.`;
        }
        setTimeout(() => {
            openCoalitionAfterElection(winningParty, winningSeats);
        }, 3000);
    }

    function openCoalitionAfterElection(winningParty, winningSeats) {
        const coalitionGUI = document.querySelector(".coalitionformingGUI");

        if (!coalitionGUI) {
            console.warn("Coalition GUI not found");
            return;
        }

        openCoalitionFormation()
        updateCoalitionGUI();
    }

    function updateElectionNightDisplay() {
        const called = gameState.electionNight.calledDistricts.length;
        document.getElementById("districtscalled").textContent = called;

        const totalDistricts = ELECTION_NIGHT_ORDER.length;

        const progress = Math.round(
            (called / totalDistricts) * 100
        );

        document.getElementById("progresstocompletion").textContent = `${progress}%`;
        const seats = gameState.electionNight.seats;

        document.getElementById("SDPseatswon").textContent = seats.SDP || 0;
        document.getElementById("KESKseatswon").textContent = seats.KESK || 0;
        document.getElementById("KOKseatswon").textContent = seats.KOK || 0;
        document.getElementById("VASseatswon").textContent = seats.VAS || 0;
        document.getElementById("VIHRseatswon").textContent = seats.VIHR || 0;
        document.getElementById("RKPseatswon").textContent = seats.RKP || 0;
        document.getElementById("SKLseatswon").textContent = seats.SKL || 0;
        document.getElementById("ALANDseatswon").textContent = seats.ALAND || 0;
    }

    function updateParliamentMapElectionNight() {
        const vacantGroup = document.getElementById("0-Vacant");
        if (!vacantGroup) return;

        const seats = vacantGroup.querySelectorAll("circle");

        seats.forEach(seat => {
            seat.style.fill = "#7f7f7f";
        });

        let seatIndex = 0;

        Object.entries(gameState.electionNight.seats).forEach(
            ([party,seatCount]) => {
                const color = PARTY_COLORS[party] || "#7f7f7f";
                for (let i = 0; i < seatCount; i++) {
                    if (seats[seatIndex]) {
                        seats[seatIndex].style.fill = color;
                    }
                    seatIndex++;
                }
            }
        );
    }

    function updateElectionPrediction(districtId) {
        const district = document.getElementById(districtId);
        if (!district) return;
        const result = calculateDistrictSeats(districtId);

        const sorted = Object.entries(result).sort((a,b) => b[1] - a[1]);
        const first = sorted[0];

        if (!first) {
            document.getElementById("prediction").textContent = "No result";
            return;
        }
        const party = first[0];
        const seats = first[1];
        document.getElementById("prediction").textContent = `${district.dataset.name || districtId}: ${party} leads with ${seats} projected seats`;
    }

    function updateElectionNightPartyOrder() {
        const column = document.querySelector(".partycolumn");
        if (!column) return;

        const rows = Array.from(column.querySelectorAll(".candidaterow"));

        rows.sort((a,b) => {
            const seatsA = parseInt(
                a.querySelector("span")?.textContent || "0",
                10
            );
            const seatsB = parseInt(
                b.querySelector("span")?.textContent || "0",
                10
            );
            return seatsB - seatsA;
        });
        rows.forEach(row => column.appendChild(row));
    }

    // ----- AI -----

    const AI_CONFIG = {
        SDP:{
            name:"SDP",
            aiType:"major",
            budgetMin:160000,
            budgetMax:240000,
            maxActions:5,

            preferredDistricts:[
                "Helsinki-Metro",
                "Varsinais-Suomi",
                "Satakunta",
                "Hame",
                "Pirkanmaa",
                "Kymi",
                "South-Savo",
                "North-Karelia",
                "Central-Finland",
            ],
            rallyBias:1.1,
            adBias:0.95,
            canvassBias:1.25,
        },
        KESK:{
            name:"Keskusta",
            aiType:"major",
            budgetMin:165000,
            budgetMax:245000,
            maxActions:5,

            preferredDistricts:[
                "South-Savo",
                "North-Karelia",
                "Central-Finland",
                "Vaasa",
                "Oulu",
                "Lapland",
                "North-Savo",
            ],
            rallyBias:1.25,
            adBias:0.9,
            canvassBias:1.15,
        },
        KOK:{
            name:"Kokoomus",
            aiType:"major",
            budgetMin:155000,
            budgetMax:235000,
            maxActions:4,

            preferredDistricts:[
                "Helsinki-Metro",
                "Uusimaa",
                "Varsinais-Suomi",
                "Hame",
                "Pirkanmaa",
            ],
            rallyBias:0.95,
            adBias:1.05,
            canvassBias:0.95,
        }
    }

    const MINOR_AI_CONFIG = {
        VAS:{
            name:"Vasemmistoliitto",
            budgetMin:60000,
            budgetMax:100000,
            preferredDistricts:[
                "Helsinki-Metro",
                "Hame",
                "Satakunta",
                "Kymi",
                "North-Karelia"
            ],
            rallyBias:0.9,
            adBias:0.7,
            canvassBias:1.3,
            defenseThreshold:12,
            minimumSupport:4,
            maxActions:3
        },
        VIHR:{
            name:"Vihrea liitto",
            budgetMin:50000,
            budgetMax:90000,
            preferredDistricts:[
                "Helsinki-Metro",
                "Uusimaa",
                "Varsinais-Suomi",
                "Pirkanmaa"
            ],
            rallyBias:0.8,
            adBias:1.2,
            canvassBias:1.0,
            defenseThreshold:10,
            minimumSupport:3,
            maxActions:3
        },
        RKP:{
            name:"Swedish People's Party",
            budgetMin:60000,
            budgetMax:100000,
            preferredDistricts:[
                "Vaasa",
                "Oulu",
                "Helsinki-Metro",
                "Uusimaa"
            ],
            rallyBias:1.0,
            adBias:0.8,
            canvassBias:1.3,
            defenseThreshold:15,
            minimumSupport:10,
            maxActions:3
        },
        SKL:{
            name:"Christian League",
            budgetMin:40000,
            budgetMax:80000,
            preferredDistricts:[
                "Helsinki-Metro",
                "Hame",
                "Varsinais-Suomi"
            ],
            rallyBias:1.0,
            adBias:0.9,
            canvassBias:1.1,
            defenseThreshold:8,
            minimumSupport:3,
            maxActions:2
        },
        ALAND:{
            name:"Liberals for Aland",
            budgetMin:30000,
            budgetMax:60000,
            preferredDistricts:[
                "Aland"
            ],
            rallyBias:1.2,
            adBias:0.8,
            canvassBias:1.3,
            defenseThreshold:20,
            minimumSupport:10,
            maxActions:2,
        }
    }

    function getMinorAIDistrictPriority(partyId, districtId) {
        const support = gameState.districtSupport[districtId]?.[partyId];
        if (support === undefined) {
            return -Infinity;
        }
        const config = MINOR_AI_CONFIG[partyId];
        const floor = getMinorSupportFloor(partyId, districtId);
        let priority = 0;

        if (config.preferredDistricts.includes(districtId)) {
            priority += 15;
        }
        if (support <= floor + 3) {
            priority += 50;
        } else if (support <= config.defenseThreshold) {
            priority += 30;
        } else if (support <= config.defenseThreshold + 5) {
            priority += 10;
        }

        if (support >= 25) {
            priority -= 20;
        }
        if (support >= 35) {
            priority -= 40;
        }
        priority += Math.random() * 4;
        return priority;
    }

    function runOpponentTurn() {
        const aiParties = MAJOR_PARTIES.filter(
            partyId => partyId !== gameState.party
        );

        aiParties.forEach(partyId => {
            runPartyAI(partyId);
        });

        const minorAIParties = Object.keys(MINOR_AI_CONFIG).filter(
            partyId => partyId !== gameState.party
        );

        minorAIParties.forEach(partyId => {
            runMinorPartyAI(partyId);
        })
    }

    function runMinorPartyAI(partyId) {
        const config = MINOR_AI_CONFIG[partyId];
        if (!config) return;
        if (gameState.party === partyId) {
            return;
        }

        let aiFunds = config.budgetMin + Math.random() * (config.budgetMax - config.budgetMin);

        const rallyCost = 50000;
        const adCost = 120000;
        const canvassCost = 30000;

        let districts = Object.keys(gameState.districtSupport).filter(districtId => {
            const support = gameState.districtSupport[districtId];
            return (
                support &&
                support[partyId] !== undefined
            );
        });

        districts.sort((a, b) => {
            const scoreA = getMinorAIDistrictPriority(partyId, a);
            const scoreB = getMinorAIDistrictPriority(partyId, b);
            return scoreB - scoreA;
        });
        let actionsTaken = 0;
        const maxActions = config.maxActions;
        while (
            aiFunds >= canvassCost &&
            districts.length > 0 &&
            actionsTaken < maxActions
        ) {
            const target = chooseMinorAIDistrict(partyId, districts);
            if (!target) break;
            const action = chooseMinorAIAction(partyId, target, aiFunds);

            let actionTaken = false;

            if (
                action === "ad" &&
                aiFunds >= adCost
            ) {
                aiFunds -= adCost;
                const effect = (Math.random() * 1.2 + 0.5) * config.adBias;
                applyCampaignEffect(target, partyId, effect);
                actionTaken = true;
            } else if (
                action === "rally" &&
                aiFunds >= rallyCost
            ) {
                aiFunds -= rallyCost;
                const effect = (Math.random() * 1.5 + 0.8) * config.rallyBias;
                applyCampaignEffect(target, partyId, effect);
                actionTaken = true;
            } else if (
                aiFunds >= canvassCost
            ) {
                aiFunds -= canvassCost;
                const effect = (Math.random() * 2 + 1) * config.canvassBias;
                applyCampaignEffect(target, partyId, effect);
                actionTaken = true;
            }

            if (actionTaken) {
                actionsTaken++;
                const targetIndex = districts.indexOf(target);
                if (targetIndex !== -1) {
                    districts.splice(
                        targetIndex,
                        1
                    );
                }
            } else {
                break;
            }
        }
    }

    function chooseMinorAIDistrict(partyId, districts) {
        if (districts.length === 0) {
            return null;
        }
        const config = MINOR_AI_CONFIG[partyId];
        const viableDistricts = districts.filter(districtId => {
            const support = gameState.districtSupport[districtId]?.[partyId];
            const floor = getMinorSupportFloor(partyId, districtId);
            return support !== undefined && support > floor;
        });
        if (viableDistricts.length === 0) {
            return null;
        }
        const candidates = viableDistricts.slice(
            0,
            Math.min(3, viableDistricts.length)
        );
        return candidates[
            Math.floor(Math.random() * candidates.length)
        ];
    }

    function chooseMinorAIAction(partyId, districtId, aiFunds) {
        const support = gameState.districtSupport[districtId][partyId];
        const config = MINOR_AI_CONFIG[partyId];
        const isHomeDistrict = config.preferredDistricts.includes(districtId);

        if (
            isHomeDistrict &&
            support >= config.defenseThreshold &&
            support < 20 &&
            aiFunds >= 50000
        ) {
            return Math.random() < 0.7 ? "rally" : "canvass";
        }

        if (
            isHomeDistrict &&
            support >= 20 &&
            support <= 35
        ) {
            if (aiFunds >= 50000) {
                return Math.random() < 0.6 ? "canvass" : "rally";
            }
            return "canvass";
        }

        if (
            isHomeDistrict &&
            support >= 25 &&
            support <= 40 &&
            aiFunds >= 120000 &&
            Math.random() < 0.25
        ) {
            return "ad";
        }
        return "canvass";
    }

    function runPartyAI(partyId) {
        const config = AI_CONFIG[partyId];
        if (!config) return;

        if (gameState.party === partyId) {
            return;
        }

        let aiFunds = config.budgetMin + Math.random() * (config.budgetMax - config.budgetMin);

        const rallyCost = 50000;
        const adCost = 120000;
        const canvassCost = 30000;

        let districts = Object.keys(gameState.districtSupport).filter(districtId => {
            const support = gameState.districtSupport[districtId];
            if (!support || support[partyId] === undefined) {
                return false;
            }
            return true;
        });
        districts.sort((a,b) => {
            const scoreA = getAIDistrictPriority(partyId, a);
            const scoreB = getAIDistrictPriority(partyId, b);
            return scoreB - scoreA;
        });

        let actionsTaken = 0;
        const maxActions = config.maxActions;
        while (
            aiFunds >= canvassCost &&
            districts.length > 0 &&
            actionsTaken < maxActions
        ) {
            const target = chooseAIDistrict(partyId, districts);
            if (!target) break;
            const action = chooseAIAction(partyId, target, aiFunds);
            if (action === "ad" && aiFunds >= adCost) {
                aiFunds -= adCost;
                const effect = (Math.random() * 1.5 +0.5) * config.adBias;
                applyCampaignEffect(target, partyId, effect);
                actionsTaken++;
            } else if (action === "rally" && aiFunds >= rallyCost) {
                aiFunds -= rallyCost;
                const effect = (Math.random() * 2 + 1) * config.rallyBias;
                applyCampaignEffect(target, partyId, effect);
                actionsTaken++
            } else if (aiFunds >= canvassCost) {
                aiFunds -= canvassCost;
                const effect = (Math.random() * 2.5 + 1.5) * config.canvassBias;
                applyCampaignEffect(target, partyId, effect);
                actionsTaken++
            } else {
                break;
            }
        }
    }

    function getAIDistrictPriority(partyId, districtId) {
        const support = gameState.districtSupport[districtId];
        if (!support || support[partyId] === undefined) {
            return -Infinity;
        }
        const currentSupport = support[partyId];
        const config = AI_CONFIG[partyId];
        let priority = 0;

        if (config.preferredDistricts.includes(districtId)) {
            priority += 12;
        }

        if (currentSupport >= 25 && currentSupport <= 50) {
            priority += 25;
        } else if (currentSupport >= 15 && currentSupport < 25) {
            priority += 12;
        } else if (currentSupport > 50 && currentSupport < 60) {
            priority += 8;
        }
        if (currentSupport >= 60) {
            priority -= 20;
        }
        if (currentSupport < 10) {
            priority -= 25;
        }
        priority += Math.random() * 6;
        
        return priority;
    }

    function chooseAIDistrict(partyId, districts) {
        if (districts.length === 0) {
            return null;
        }
        const candidates = districts.slice(
            0,
            Math.min(5, districts.length)
        );

        return candidates[
            Math.floor(Math.random() * candidates.length)
        ];
    }

    function chooseAIAction(partyId, districtId, aiFunds) {
        const support = gameState.districtSupport[districtId][partyId];

        if (partyId === "KOK") {
            if (
                support >= 35 &&
                support <= 52 &&
                aiFunds >= 120000 &&
                Math.random() < 0.65
            ) {
                return "ad";
            }

            if (
                support >= 25 &&
                support <= 50 &&
                aiFunds >= 50000
            ) {
                return Math.random() < 0.6 ? "rally" : "canvass";
            }
        }

        if (partyId === "SDP") {
            if (
                support >= 20 &&
                support <= 55 &&
                aiFunds >= 30000
            ) {
                return Math.random() < 0.7 ? "canvass" : "rally";
            }
        }

        if (partyId === "KESK") {
            if (
                support >= 25 &&
                support <= 60 &&
                aiFunds >= 50000
            ) {
                return Math.random() < 0.65 ? "rally" : "canvass";
            }
        }

        const roll = Math.random();

        if (roll < 0.45) {
            return "canvass";
        }
        if (roll < 0.80) {
            return "rally";
        }
        if (aiFunds >= 120000) {
            return "ad";
        }
        return "canvass";
    }

    function getMinorSupportFloor(partyId, districtId) {
        const config = MINOR_AI_CONFIG[partyId];
        if (!config) return 0;
        if (typeof config.minimumSupport === "object") {
            return config.minimumSupport[districtId] ?? 0;
        }
        return config.minimumSupport ?? 0;
    }

    // ----- COALITION MAKING -----

    function openCoalitionFormation() {
        const coalitionGUI = document.querySelector(".coalitionformingGUI");
        if (!coalitionGUI) return;
        coalitionGUI.style.display = "block";

        const playerParty = gameState.party;
        const largestParty = getLargestParty();
        console.log("Player party:", playerParty);
        console.log("Largest party:", largestParty);
        console.log("Election seats:", gameState.electionNight.seats)

        updateCoalitionGUI();

        if (playerParty !== largestParty) {
            document.querySelectorAll(
                ".coalitionpartyrow input[type='checkbox']"
            ).forEach(checkbox => {
                checkbox.style.display = "none";
                checkbox.checked = false;
            });
            document.getElementById("formgovernment").style.display = "none";
            document.getElementById("formminoritygovernment").style.display = "none";
            alert(
                `You are not the largest party in the Eduskunta.\n\n` +
                `The ${largestParty} has the plurality and will have the first opportunity to form a government.`
            )
            return;
        }

        document.getElementById("formgovernment").style.display = "block";
        document.getElementById("formminoritygovernment").style.display = "block";
    }

    function updateCoalitionGUI() {
        const seats = gameState.electionNight.seats;
        const playerParty = gameState.party;
        let totalSeats = 0;

        Object.entries(seats).forEach(([partyId, seatCount]) => {
            totalSeats += seatCount;
            const checkbox = document.getElementById(`${partyId}checkbox`);
            const seatDisplay = document.getElementById(`${partyId}finalseatswon`);

            if (seatDisplay) {
                seatDisplay.textContent = seatCount;
            }

            if (checkbox) {
                const row = checkbox.closest(".coalitionpartyrow");
                const bar = row?.querySelector(".partybar");
                if (bar) {
                    const width = (seatCount / 200) * 100;
                    bar.style.width = `${width}%`;
                }
            }

            if (checkbox) {
                if (partyId === playerParty) {
                    checkbox.checked = true;
                    checkbox.style.display = "none";
                } else {
                    checkbox.style.display = "inline-block";
                }
            }

            const relationDisplay = document.getElementById(`${partyId}relations`);
            if (relationDisplay) {
                if (partyId === playerParty) {
                    relationDisplay.textContent = "You";
                } else {
                    relationDisplay.textContent = getPartyRelation(playerParty, partyId);
                }
            }
        });
        updateProjectedCoalition();
    }

    function getPartyRelation(partyA, partyB) {
        if (!gameState.partyRelations[partyA]) return 0;
        if (gameState.partyRelations[partyA][partyB] === undefined) return 0;
        return gameState.partyRelations[partyA][partyB];
    }

    function getIdeologicalCompatibility(partyA, partyB) {
        const a = ALL_PARTIES[partyA];
        const b = ALL_PARTIES[partyB];

        if (!a || !b || !a.ideology || !b.ideology) {
            return 0;
        }
        const socialDistance = Math.abs(
            a.ideology.social - b.ideology.special
        );
        const economicDistance = Math.abs(
            a.ideology.economic - b.ideology.economic
        );
        const totalDistance = socialDistance + economicDistance;
        return 6 - totalDistance;
    }

    function getSelectedCoalition() {
        const coalition = [gameState.party];
        document.querySelectorAll(".coalitionpartyrow input[type='checkbox']:checked").forEach(checkbox => {
            if (!coalition.includes(checkbox.value)) {
                coalition.push(checkbox.value);
            }
        });
        return coalition;
    }

    function calculateCoalitionSeats(coalition) {
        return coalition.reduce((total, partyId) => {
            return total + (gameState.electionNight.seats[partyId] || 0);
        }, 0);
    }

    function updateProjectedCoalition() {
        const coalition = getSelectedCoalition();
        const seats = calculateCoalitionSeats(coalition);

        document.getElementById("projectedcoalition").textContent = seats;
    }

    function getCoalitionAcceptanceChance(playerParty, targetParty) {
        const relation = getPartyRelation(playerParty, targetParty);
        if (relation >= 12) {
            return 100;
        }
        const compatibility = getIdeologicalCompatibility(
            playerParty,
            targetParty
        );

        let chance = 50;

        chance += relation * 2;
        chance += compatibility * 4;
        chance = Math.max(5, Math.min(95, chance));
        return chance;
    }

    function negotiateWithParty(targetParty) {
        const playerParty = gameState.party;
        const relation = getPartyRelation(
            playerParty,
            targetParty
        );
        const compatibility = getIdeologicalCompatibility(
            playerParty,
            targetParty
        );
        const chance = getCoalitionAcceptanceChance(
            playerParty,
            targetParty
        );
        const roll = Math.random() * 100;
        const accepted = roll < chance;

        return {
            accepted,
            relation,
            compatibility,
            chance,
            roll
        };
    }

    document.querySelectorAll(
        ".coalitionpartyrow input[type='checkbox']"
    ).forEach(checkbox => {
        checkbox.addEventListener("change", updateProjectedCoalition);
    });

    document.getElementById("formgovernment").addEventListener("click", () => {
        const coalition = getSelectedCoalition();
        const seats = calculateCoalitionSeats(coalition);

        if (seats < 101) {
            alert(`You need 101 seats to form a government. Your coalition currently have ${seats} seats`);
            return;
        }

        const unwillingParties = [];
        const acceptedParties = [gameState.party];

        for (const partyId of coalition) {
            if (partyId === gameState.party) continue;
            const negotiation = negotiateWithParty(partyId);
            console.log(
                `${partyId} coalition negotiation:`,
                negotiation
            );

            if (negotiation.accepted) {
                acceptedParties.push(partyId);
            } else {
                unwillingParties.push({
                    partyId,
                    relation: negotiation.relation,
                    compatibility: negotiation.compatibility,
                    chance: negotiation.chance
                });
            }
        }

        if (unwillingParties.length > 0) {
            const names = unwillingParties.map(party => {
                return ALL_PARTIES[party.partyId]?.name || party.partyId;
            });
            alert(
                `Coalition negotiations have failed.\n\n` +
                `${names.join(", ")} ` +
                `declined to enter the government.`
            )
        }

        gameState.coalition = acceptedParties;
        gameState.governmentFormed = true;
        gameState.governmentType = "majority";
        const finalSeats = calculateCoalitionSeats(acceptedParties);
        alert(
            `Government formed!\n\n` +
            `Coalition: ${acceptedParties.join(", ")}\n` +
            `Seats: ${finalSeats}` +
            `This is a majority government.`
        )

        document.querySelector(".coalitionformingGUI").style.display = "none";
        showEnding();
    });

    document.getElementById("formminoritygovernment").addEventListener("click", () => {
        const playerParty = gameState.party;
        const largestParty = getLargestParty();
        const playerSeats = gameState.electionNight.seats[playerParty] || 0;

        if (playerParty !== largestParty) {
            alert(
                `You cannot form a minority government\n\n` +
                `${largestParty} has the plurality of seats`
            )
        }

        if (playerSeats >= 101) {
            alert(
                `You already have ${playerSeats} seats.\n\n` +
                `You can form a majority government instead`
            );
            return;
        }

        const majorityCheck = canFormPossibleMajority();

        if (majorityCheck.canFormMajority) {
            alert(
                `A majority government is still possible\n\n` +
                `Parties currently willing to work with you could give your government up to ` +
                `${majorityCheck.possibleSeats} seats.\n\n` +
                `You must attempt to form a majority coalition instead`
            );
            return;
        }

        const supporter = getMinoritySupporter();

        if (!supporter) {
            alert(
                `No other party is currently willing to support or tolerate ` +
                `a ${playerParty} minority government`
            );
            return;
        }
        gameState.governmentFormed = true;
        gameState.governmentType = "minority";
        gameState.minoritySupport = supporter;
        
        alert(
            `Minority government formed!\n\n` +
            `${playerParty} will government with ${playerSeats} seats\n\n` +
            `${supporter} is willing to support or tolerate the government`
        );
        document.querySelector(".coalitionformingGUI").style.display = "none";
        showEnding();
    })

    document.getElementById("endnegotiations").addEventListener("click", () => {
        gameState.governmentFormed = false;
        gameState.governmentType = null;

        alert(
            `${gameState.party} has ended coalition negotiations ` +
            `and entered opposition`
        );

        document.querySelector(".coalitionformingGUI").style.display = "none";
        showEnding();
    })

    function getLargestParty() {
        const seats = gameState.electionNight.seats;
        return Object.entries(seats).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    }

    function getMinoritySupporter() {
        const playerParty = gameState.party;
        const otherParties = Object.keys(gameState.electionNight.seats).filter(partyId => partyId !== playerParty);
        return otherParties.find(partyId => {
            return getPartyRelation(playerParty, partyId) >= 15;
        }) || null;
    }

    function canFormPossibleMajority() {
        const playerParty = gameState.party;
        const seats = gameState.electionNight.seats;

        let possibleSeats = seats[playerParty] || 0;
        const possiblePartners = [];

        Object.keys(seats).forEach(partyId => {
            if (partyId === playerParty) return;
            const relation = getPartyRelation(playerParty, partyId);
            if (relation >= 12) {
                possibleSeats += seats[partyId] || 0;
                possiblePartners.push(partyId);
            }
        });
        return {
            canFormMajority: possibleSeats >= 101,
            possibleSeats,
            possiblePartners
        };
    }

    document.getElementById("endingexit").addEventListener("click", () => {
        document.querySelector(".endingslide").style.display = "none";
    });

    const ENDING_CONFIG = {
        KESK:{
            majority:{
                slide:"CentreMajorityGovernment",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/Vihre%C3%A4n%20Joen%20Rannalla%20(Kauan%20Sitten)%20-%20Eppu%20Normaali.mp3",
            },
            minority:{
                slide:"CentreMinorityGovernment",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/Tahroja%20Paperilla%20-%20Eppu%20Normaali.mp3",
            },
            loss:{
                slide:"CentreLoss",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/Eppu%20Normaali%20-%20Murheellisten%20laulujen%20maa%20-%20SuomiMusic.mp3",
            }
        },
        SDP:{
            majority:{
                slide:"SDPMajorityGovernment",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/Kun%20Suomi%20Putos%20Puusta%20-%20Ismo%20Alanko.mp3",
            },
            minority:{
                slide:"SDPMinorityGovernment",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/Taiteilijael%C3%A4m%C3%A4%C3%A4%20-%20Ismo%20Alanko.mp3",
            },
            loss:{
                slide:"SDPLoss",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/Poplaulajan%20Vapaap%C3%A4iv%C3%A4%20-%20Nelj%C3%A4%20Ruusua.mp3",
            }
        },
        KOK:{
            majority:{
                slide:"KokMajorityGovernment",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/Enkeleit%C3%A4%20Onko%20Heit%C3%A4%20-%20Aki%20Sirkesalo.mp3",
            },
            minority:{
                slide:"KokMinorityGovernment",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/Todella%20kaunis%20-%20Zen%20Cafe.mp3",
            },
            loss:{
                slide:"KokLoss",
                song:"https://file.garden/aZo5FVsRbiDb3nc-/finland/Ending%20Songs/CMX%20-%20Ruoste%20-%20CmxVEVO.mp3",
            }
        }
    }

    function showEnding() {
        const playerParty = gameState.party;
        let endingType;

        if (gameState.governmentFormed) {
            if (gameState.governmentType === "majority") {
                endingType = "majority";
            } else if (gameState.governmentType === "minority") {
                endingType = "minority";
            }
        } else {
            endingType = "loss"
        }

        const ending = ENDING_CONFIG[playerParty]?.[endingType];
        if (!ending) {
            console.error(
                "No ending configuration found for:",
                playerParty,
                endingType
            );
            return;
        }

        document.querySelectorAll(".endingslidecontent").forEach(slide => {
            slide.style.display = "none";
        });
        const endingContainer = document.querySelector(".endingslide");
        if (endingContainer) {
            endingContainer.style.display = "block";
        }
        const endingSlide = document.getElementById(ending.slide);
        if (endingSlide) {
            endingSlide.style.display = "block";
        }
        if (endingAudio) {
            endingAudio.pause();
            endingAudio.currentTime = 0;
        }
        endingAudio = new Audio(ending.song);
        endingAudio.volume = 0.7;
        endingAudio.play().catch(error => {
            console.warn(
                "Ending music could not play:",
                error
            )
        })
    }
});
