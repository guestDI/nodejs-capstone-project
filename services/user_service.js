const getExercisesLog = (rows) => {
    let username, _id;

    const exercisesLog = rows.map((row) => {
        username = row.username;
        _id = row._id;

        return {
            description: row.description,
            duration: row.duration,
            date: new Date(row.date).toDateString()
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
    getExercisesLog
}