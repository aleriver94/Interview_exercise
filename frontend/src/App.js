import React, { useState, useEffect } from 'react'

import './App.css';
import AddTask from './components/AddTask'
import Task from './components/Task'
import AddFolder from './components/AddFolder';
import Folder from './components/Folder'

import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'

function App() {
	

	const [tasks, setTasks] = useState([])

	const getTasks = async () => {
		try {
			const response = await axios.get('/backend_api/todo/')
			const { data } = response
			setTasks(data)
		} catch (err) {
			console.log(err)
		}
	}

	const [folders, setFolders] = useState([])

	const getFolders = async () => {
		try {
			const response = await axios.get('/backend_api/todo/')
			const { data } = response
			setFolders(data)
		} catch (err) {
			console.log(err)
		}
	}


	useEffect(() => {
		getTasks()
	}, [])

	useEffect(() => {
		getFolders()
	}, [])

	const addTask = async newTask => {
		try {
			console.log(newTask)
			await axios.post('/backend_api/todo/', newTask)
			getTasks()
		} catch (err) {
			console.log(err)
		}
	}

	const addFolder = async newFolder => {
		try {
			console.log(newFolder)
			await axios.post('/backend_api/todo/', newFolder)
			getFolders()
		} catch (err) {
			console.log(err)
		}
	}

	const completeTask = async id => {
		try {
			const task = tasks.filter(task => task.id === id)[0]
			task.completed = true
			await axios.put(`/backend_api/todo/${id}/`, task)
			getTasks()
		} catch(err) {
			console.log(err)
		}
	}

	const editTask = async task => {
		try {
			await axios.put(`/backend_api/todo/${task.id}/`, task)
			getTasks()
		} catch(err) {
			console.log(err)
		}
	}

	const editFolder = async folder => {
		try {
			await axios.put(`/backend_api/todo/${folder.id}/`, folder)
			getFolders()
		} catch(err) {
			console.log(err)
		}
	}

	const deleteTask = async id => {
		try {
			await axios.delete(`/backend_api/todo/${id}/`)
			getTasks()
		} catch(err) {
			console.log(err)
		}
	}

	const deleteFolder = async id => {
		try {
			await axios.delete(`/backend_api/todo/${id}/`)
			getFolders()
		} catch(err) {
			console.log(err)
		}
	}

	return (
			<div className='wrapper'>
			<Container>
				<ul class="circles">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
				</ul>
				<Row className='justify-content-center pt-5'>
					<Col>
						<Card className='p-5'>
								<h3>To-do List</h3>
								<AddTask addTask={addTask} />
								{tasks.map((task, index) => (
									<Task key={index} id={task.id} title={task.title} completeTask={completeTask} editTask={editTask} deleteTask={deleteTask} />
								))}
						</Card>
					</Col>
				</Row>

			</Container>
			</div>
		);
}

export default App;