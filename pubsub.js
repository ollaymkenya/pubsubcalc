export const pubsub = {
    events: {},

    subscribe: (eventName, fn, subscriber) => {
        console.log(`PUBSUB: "${subscriber}" has subscribed to know about the ${eventName} event`);
        pubsub.events[eventName] = pubsub.events[eventName] || [];
        pubsub.events[eventName].push(fn);
    },

    publish: function (eventName, data) {
        console.log(`PUBSUB: making a broadcast about "${eventName}" event with the data: ${JSON.stringify(data)}`);
        return this.events[eventName] ? this.events[eventName].forEach(fn => fn(data)) : null;
    }
}