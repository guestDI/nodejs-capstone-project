const transformExercisesLog = (exercises) => {
    let username, _id;

    const exercisesLog = exercises.map((exercise) => {
        username = username ?? exercise.username;
        _id = _id ?? exercise._id;

        return {
            description: exercise.description,
            duration: exercise.duration,
            date: new Date(exercise.date).toDateString()
        }
    })

    return {
        username,
        count: exercisesLog.length,
        _id,
        log: exercisesLog
    }
}

module.exports = {
    transformExercisesLog
}