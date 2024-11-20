const tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedtask = JSON.parse(localStorage.getItem('tasks'));

    if (storedtask && Array.isArray(storedtask)) {
        tasks.push(...storedtask);
        console.log("Loaded tasks:", tasks);
        updatetasklist();
        updatestats();
    }
});

const savetasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log("Tasks saved:", tasks);
}

const addtask = () => {
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskinput.value = "";
        console.log("Task added:", tasks);
        updatetasklist();
        updatestats();
        savetasks();
    } else {
        console.warn("No task text entered.");
    }
};

const toggletaskcomplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updatetasklist();
    updatestats();
    savetasks();
};

const deltask = (index) => {
    tasks.splice(index, 1);
    updatetasklist();
    updatestats();
    savetasks();
};

const edittask = (index) => {
    const taskinput = document.getElementById("taskinput");
    taskinput.value = tasks[index].text;

    tasks.splice(index, 1);
    updatetasklist();
    updatestats();
    savetasks();
};

const updatestats = () => {
    const completedtask = tasks.filter(task => task.completed).length;
    const totaltask = tasks.length;
    const progress = totaltask > 0 ? (completedtask / totaltask) * 100 : 0;
    const progressbar = document.getElementById("progress");

    if (progressbar) {
        progressbar.style.width = `${progress}%`;
    }

    const numbers = document.getElementById("numbers");
    if (numbers) {
        numbers.innerText = `${completedtask} / ${totaltask}`;
    }

    if (tasks.length && completedtask === totaltask) {
        confetti();
    }
};

const updatetasklist = () => {
    const tasklist = document.querySelector(".tasklist");
    
    if (tasklist) {
        tasklist.innerHTML = ""; // Clear the current list
        
        tasks.forEach((task, index) => {
            const listitem = document.createElement("li");

            listitem.innerHTML = `
            <div class="taskitem">
                <div class="task" ${task.completed ? 'completed' : ''}>
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="images/edit.png" onclick=edittask(${index}) />
                    <img src="images/bin.png" onclick=deltask(${index}) />
                </div>
            </div>`;

            listitem.addEventListener("change", () => toggletaskcomplete(index));
            tasklist.append(listitem);
        });

        console.log("Task list updated:", tasks);
    } 
};


document.getElementById("newtask").addEventListener("click", (e) => {
    e.preventDefault();
    addtask();
});

const confetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
