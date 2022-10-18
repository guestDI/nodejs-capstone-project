const transformExercisesLog = ({ count, rows }) => {
  let username, _id;

  const exercisesLog = rows.map((exercise) => {
    username = username ?? exercise.username;
    _id = _id ?? exercise._id;

    return {
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
    };
  });

  return {
    username,
    count,
    _id,
    log: exercisesLog,
  };
};

const parseDatabaseError = (error) => {
  return error.errors.map((e) => {
    return {
      [e.path]: e.message,
    };
  });
};

const transformExerciseResponse = (exercise) => {
  return {
    ...exercise.dataValues,
    date: exercise.dataValues.date.toDateString(),
  };
};

module.exports = {
  transformExercisesLog,
  parseDatabaseError,
  transformExerciseResponse,
};
