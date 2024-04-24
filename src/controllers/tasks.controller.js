import Task from '../models/tasks.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id // aqui solo nos estaremos trayendo las tareas del usuario logueado
    }).populate('user') // aqui estamos relacionando nuestra tarea con el usuario
    res.json(tasks)
}

export const createTasks = async (req, res) => {
    const { title, description, date } = req.body

    console.log(req.user)
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    });
    const saveTask = await newTask.save();
    res.json(saveTask);
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate("user") // esto es el dato de la url que se pasa
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)

}

export const deleteTasks = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id, req.body, { new: true }) // con new en true nos aseguramos q devulva el nuevo valor
    if (!task) return res.status(404).json({ message: "Task not found" })
    return res.sendStatus(204)
}

export const updateTasks = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)

}

