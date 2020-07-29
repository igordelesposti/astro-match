import axios from 'axios'

//ACTION SYNC
export const setProfile = (profile) => {
	return {
		type: 'SET_PROFILE',
		payload: {
			profile: profile,
			
		}
	}
}

export const setProfilesMatchs = (profile) => {
	return{
		type: 'SET_PROFILES_MATCHS',
		payload: {
			profile: profile,
		}
	}
}


//ACTION ASYNC


export const getProfile = () => async (dispatch, getState) => {
	const response = await axios.get('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/igor-hamilton/person')
	dispatch(setProfile(response.data.profile))
	console.log(response.data.profile)
}

export const chooseProfile = (id, choice) => async (dispatch, getState) => {
	const body = {
		id: id,
		choice: choice,
	}

	const response = await axios.post(
		"https://us-central1-missao-newton.cloudfunctions.net/astroMatch/igor-hamilton/choose-person", body
	);

	dispatch(getProfile());

};

export const getMatches = () => async (dispatch, getState) => {
	const response = await axios.get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/igor-hamilton/matches");
	
	dispatch(setProfilesMatchs(response.data.matches));
	console.log(response.data.matches);
}

export const clearSwipes = () => async (dispatch) => {
	await axios.put('https://us-central1-missao-newton.cloudfunctions.net/astroMatch/igor-hamilton/clear')
}
