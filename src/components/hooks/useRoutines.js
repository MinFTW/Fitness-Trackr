import { useContext } from 'react';
import RoutinesContext from '../../RoutinesContext';

const useRoutines = () => {
  const {
    routines,
    setRoutines,
    detailedRoutine,
    setDetailedRoutine,
    routineToDisplay,
    setRoutineToDisplay,
    myRoutines,
    setMyRoutines,
    name,
    setName,
    goal,
    setGoal,
    isPublic,
    setIsPublic,
    updateForm,
    setUpdateForm,
    routineToUpdate,
    setRoutineToUpdate,
  } = useContext(RoutinesContext);

  return {
    routines,
    setRoutines,
    detailedRoutine,
    setDetailedRoutine,
    routineToDisplay,
    setRoutineToDisplay,
    myRoutines,
    setMyRoutines,
    name,
    setName,
    goal,
    setGoal,
    isPublic,
    setIsPublic,
    updateForm,
    setUpdateForm,
    routineToUpdate,
    setRoutineToUpdate,
  };
};

export default useRoutines;
