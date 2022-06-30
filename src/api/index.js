const BASE_URL = 'https://strangers-things.herokuapp.com/api';

// USER ENDPOINTS
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPublicRoutinesByUser = async (token, username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

// ACTIVITIES ENDPOINTS
export const fetchAllActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createActivity = async (token, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          name,
          description,
        },
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateActivity = async (token, activityId, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          name,
          description,
        },
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPublicRoutinesByActivity = async (activityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/activities/${activityId}/routines`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

// ROUTINE ENDPOINTS
export const fetchAllPublicRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createRoutine = async (token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          name,
          goal,
          isPublic,
        },
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateRoutine = async (token, routineId, name, goal, isPublic) => {
  try {
    const response = await fetch(`${BASE_URL}/routine/${routineId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          name,
          goal,
          isPublic,
        },
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRoutine = async (token, routineId) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const addActivityToRoutine = async (
  token,
  routineId,
  activityId,
  count,
  duration
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routines/${routineId}/activities`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            activityId,
            count,
            duration,
          },
        }),
      }
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

// ROUTINE_ACTIVITIES ENDPOINTS
export const updateRoutineActivity = async (
  token,
  routineActivityId,
  count,
  duration
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            count,
            duration,
          },
        }),
      }
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRoutineActivity = async (token, routineActivityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routines_activities/${routineActivityId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};
