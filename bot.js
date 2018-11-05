// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

// Adaptive Cards
// Turn counter property
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';

const { CardFactory } = require('botbuilder');

// Import AdaptiveCard content.
const FlightItineraryCard = require('./resources/FlightItineraryCard.json');
const ImageGalleryCard = require('./resources/ImageGalleryCard.json');
const LargeWeatherCard = require('./resources/LargeWeatherCard.json');
const RestaurantCard = require('./resources/RestaurantCard.json');
const SolitaireCard = require('./resources/SolitaireCard.json');

// Create array of AdaptiveCard content, this will be used to send a random card to the user.
const CARDS = [
    FlightItineraryCard,
    ImageGalleryCard,
    LargeWeatherCard,
    RestaurantCard,
    SolitaireCard
];

class MyBot {
  /**
   *
   * @param {ConversationState} conversation state object
   */
  constructor(conversationState) {
    // Creates a new state accessor property.
    // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
    this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
    this.conversationState = conversationState;
  }
  /**
   *
   * @param {TurnContext} on turn context object.
   */
  async onTurn(turnContext) {
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    if (turnContext.activity.type === ActivityTypes.Message) {
      // read from state.
      let count = await this.countProperty.get(turnContext);
      count = count === undefined ? 1 : ++count;
      //await turnContext.sendActivity(`${count}: Marcel said "${turnContext.activity.text}"`);


        await turnContext.sendActivity({
            text: 'Here is an Adaptive Card:',
            attachments: [
                {
                    contentType: "image/jpg",
                    contentUrl: "https://chart.googleapis.com/chart?cht=lc&chs=250x150&chd=t4:10,20,30,40,10,20,40,50,10,20,40|10,20,30,40,20,60,70,80,80,80,80&chxt=x,y",
                    name: "matsu.jpg"
                }
            ]
        });
      // increment and set turn counter.
      await this.countProperty.set(turnContext, count);
    } else {
      await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
    }
    // Save state changes
    await this.conversationState.saveChanges(turnContext);
  }
}

module.exports.MyBot = MyBot;