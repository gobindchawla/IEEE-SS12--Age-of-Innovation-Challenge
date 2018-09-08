/**
 * @file newsList module
 * @author STIU
 */

export const state = () => {
    return {
        importantList: [{
            id: 1,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5M37N36AIRiu8KxUJ7tKxzr85icRtz3hmqXkQIzpp28EyDcHL',
            title: 'Breaking News',
            rate: 4
        }, {
            id: 2,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJtpU8cJ0NrYMveZHBfRRxjzYPAWtXa-xIK4UdbvsEhyAfwdPEg',
            title: '2nd news',
            rate: 3
        }, {
            id: 3,
            src: 'http://floodlist.com/wp-content/uploads/2017/11/floods-in-Phatthalung-thailand-november-2017-768x576.jpg',
            title: '3rd news',
            rate: 1
        }],
        newsList: [
            {
                id: 1,
                location: 'Thailand',
                title: 'Earthquake in capital',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5M37N36AIRiu8KxUJ7tKxzr85icRtz3hmqXkQIzpp28EyDcHL',
                description: 'There is a 8.0 earthquake in Thailand.',
                org: 'Ruamkatanyu Foundation',
                date: '01 April',
                goal: 20000,
                achive: 15000
            },
            {
                id: 2,
                location: 'Africa',
                title: 'Starvation never goes a way ',
                description: 'This is just a description,This is just a description,This is just a description',
                img: 'https://c1.staticflickr.com/4/3720/9291527361_9571b51f4d_b.jpg',
                org: 'Ban Khru Noi',
                date: '05 April',
                goal: 32000,
                achive: 10000
            },
            {
                id: 3,
                location: 'Africa',
                title: 'Children need help',
                description: 'Nearly half of them cannot afford education fee.',
                // img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJtpU8cJ0NrYMveZHBfRRxjzYPAWtXa-xIK4UdbvsEhyAfwdPEg',
                org: 'Kru Ban Nok',
                date: '06 April',
                goal: 25000,
                achive: 12000
            }
            ,
            {
                id: 4,
                location: 'Thailand',
                title: 'Floods in plenty areas',
                description: 'Around 400,000 Hit by Floods in South',
                img: 'http://floodlist.com/wp-content/uploads/2017/11/floods-in-Phatthalung-thailand-november-2017-768x576.jpg',
                org: 'Ban Khru Noi',
                date: '12 April',
                goal: 12000,
                achive: 8000
            }
        ]
    };
};

export const mutations = {
    addData(state, data) {
        state.newsList = state.newsList.concat(data);
    }
};
export const actions = {
    addData({commit}, data) {
        commit('addData', data);
    }
};
