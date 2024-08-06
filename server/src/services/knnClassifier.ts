interface User {
    user_id?: number,
    interests_id: Array<number>
}

export class KnnClassifier {
    k: number;
    trainingData: Array<User>;

    constructor(k: number) {
        this.k = k;
        this.trainingData = [];
    }

    train(user: User) {
        this.trainingData.push(user);
    }

    classify(input: User) {
        const distances = this.trainingData.map(user => ({
            distance: this.calculateDistance(input.interests_id, user.interests_id),
            user_id: user.user_id
        }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, this.k);

        return distances.map(d => d.user_id);
    }

    calculateDistance(arr1: Array<number>, arr2: Array<number>) {

        const commonInterests = arr1.filter(value => arr2.includes(value));
        return -commonInterests.length;
    }
}

export function Main(users: Array<User>) {
    const classifier = new KnnClassifier(5);
    users.forEach(user => classifier.train(user));

    const newUser: User = { interests_id: [1, 2, 4] };
    const result = classifier.classify(newUser);
    console.log("Los IDs más cercanos son:", result);
}