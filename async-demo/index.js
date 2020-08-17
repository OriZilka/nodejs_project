
console.log('Before');

// Using Callbacks (potion 1)
// getUser(1, (user) => {
//     console.log('User', user);
//     getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits);
//         });
//     });
// });

// Using Promises (option 2) - flat code -> better practice
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));

// Using Async and Await (option 3)- looks syncrones but it's not
// Async and Await is built on top of Promise
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
    }  
}
displayCommits(); 

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off some async work
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'Ori' });
        }, 2000); // after 2 sec the function will activate
    });
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Calling GitHub API and getting ${username}\'s repos...`);
            // resolve(['repo1', 'repo2', 'repo3']); 
            reject(new Error('Could not get the repos'));
        }, 2000); // after 2 sec the function will activate
    });  
}

function getCommits(repo) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log(`Calling GitHub API and getting the commits from ${repo} repository`);
            resolve(['commit1', 'commit2']);
        }, 2000); // after 2 sec the function will activate
    });
}


//  -------------------------------------------
// Without CALLBACK HELL =>

// console.log('Before');

// getUser(1, getRepositories);

// console.log('After');

// function getRepositories(user) {
//     console.log('User', user);
//     getRepositories(user.gitHubUsername, getCommits);
// };

// function getCommits(repos) {
//     getCommits(repos[0], displayCommits);
//     console.log('Repositories', repos);
// };

// function displayCommits(commits) {
//     console.log(commits);
// };

// Callbacks
// Promises
// Async/await


