(() => {
  'use strict';

  // Pricing display configuration only. Plans do not control account access.
  const plans = Object.freeze({
    Analyst: Object.freeze({
      name: 'Analyst',
      price: 25,
      billingLabel: 'Monthly',
      limits: Object.freeze({
        searches: 250,
        machineViews: 10,
        machineViewsPeriod: 'per day',
        intelX: 10,
        intelXPeriod: 'per day'
      })
    }),
    Studio: Object.freeze({
      name: 'Studio',
      price: 60,
      billingLabel: 'Lifetime',
      limits: Object.freeze({
        searches: Infinity,
        machineViews: 35,
        machineViewsPeriod: 'daily',
        intelX: 400,
        intelXPeriod: 'per month'
      })
    })
  });

  function get(planName) {
    return plans[planName] || plans.Studio;
  }

  window.UnmaskedPlans = Object.freeze({ plans, get });
})();
