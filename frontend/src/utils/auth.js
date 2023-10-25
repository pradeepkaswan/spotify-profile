const LOCAL_STORAGE_KEYS = {
	accessToken: 'spotify_access_token',
	refreshToken: 'spotify_refresh_token',
	expireTime: 'spotify_token_expire_time',
	timestamp: 'spotify_token_timestamp',
};

function clearLocalStorage() {
	for (const key in LOCAL_STORAGE_KEYS) {
		window.localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
	}
}

export function logout() {
	clearLocalStorage();
	window.location = window.location.origin;
}

export async function refreshToken() {
	try {
		const refreshTokenValue = window.localStorage.getItem(
			LOCAL_STORAGE_KEYS.refreshToken,
		);

		if (
			!refreshTokenValue ||
			refreshTokenValue === 'undefined' ||
			Date.now() -
				Number(window.localStorage.getItem(LOCAL_STORAGE_KEYS.timestamp)) /
					1000 <
				1000
		) {
			console.error('No refresh token available');
			logout();
		}

		const response = await fetch(
			`/refresh_token?refresh_token=${refreshTokenValue}`,
		);
		const data = await response.json();

		window.localStorage.setItem(
			LOCAL_STORAGE_KEYS.accessToken,
			data.access_token,
		);
		window.localStorage.setItem(LOCAL_STORAGE_KEYS.timestamp, Date.now());

		window.location.reload();
	} catch (error) {
		console.error(error);
	}
}

export function hasTokenExpired() {
	const accessToken = window.localStorage.getItem(
		LOCAL_STORAGE_KEYS.accessToken,
	);
	const timestamp = window.localStorage.getItem(LOCAL_STORAGE_KEYS.timestamp);
	const expireTime = window.localStorage.getItem(LOCAL_STORAGE_KEYS.expireTime);

	if (!accessToken || !timestamp) {
		return false;
	}

	const millisecondsElapsed = Date.now() - Number(timestamp);
	return millisecondsElapsed / 1000 > Number(expireTime);
}

export function getAccessToken() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const queryParams = {
		[LOCAL_STORAGE_KEYS.accessToken]: urlParams.get('access_token'),
		[LOCAL_STORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
		[LOCAL_STORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
	};
	const hasError = urlParams.get('error');

	if (
		hasError ||
		hasTokenExpired() ||
		LOCAL_STORAGE_KEYS.accessToken === 'undefined'
	) {
		refreshToken();
	}

	const localStorageAccessToken = window.localStorage.getItem(
		LOCAL_STORAGE_KEYS.accessToken,
	);

	if (localStorageAccessToken && localStorageAccessToken !== 'undefined') {
		return localStorageAccessToken;
	}

	if (queryParams[LOCAL_STORAGE_KEYS.accessToken]) {
		for (const key in queryParams) {
			window.localStorage.setItem(key, queryParams[key]);
		}

		window.localStorage.setItem(LOCAL_STORAGE_KEYS.timestamp, Date.now());
		return queryParams[LOCAL_STORAGE_KEYS.accessToken];
	}

	return false;
}

export const accessToken = getAccessToken();
