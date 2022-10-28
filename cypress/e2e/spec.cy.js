/// <reference types="cypress" />
import _ from 'lodash';

describe('Funding Societies Statistics Test', () => {

  beforeEach(() => {
    cy.visit('https://fundingsocieties.com')
    cy.get('a.t-l-base-gray-darker').contains('Statistics').click()
    cy.get(':nth-child(1) > font').should('be.visible').invoke('text').should('not.be.empty')
    cy.get(':nth-child(2) > font').should('be.visible').invoke('text').should('not.be.empty')
    cy.get(':nth-child(3) > font').should('be.visible').invoke('text').should('not.be.empty')
    cy.get(':nth-child(4) > font').should('be.visible').invoke('text').should('not.be.empty')
    cy.get(':nth-child(1) > .detailCaption').should('have.text', 'Total funded')
    cy.get(':nth-child(2) > .detailCaption').should('have.text', 'No. offinancing')
    cy.get(':nth-child(3) > .detailCaption').should('have.text', 'Defaultrate')
    cy.get(':nth-child(4) > .detailCaption').should('have.text', 'Financingfulfillment rate')
    cy.get('button').contains('General').should('be.visible').should('not.be.disabled')
    cy.get('button').contains('Repayment').should('be.visible').should('not.be.disabled')
    cy.get('button').contains('Disbursement').should('be.visible').should('not.be.disabled')
  })

  it('General tab', () => {
    cy.get('button').contains('General').click()
    // Hover the chart to show the tooltip class to get data
    cy.get(".highcharts-graph").first()
                               .trigger('mouseover', {force:true})
                               .click({force:true})
                               .wait(100)

    cy.get("g.highcharts-markers").first()
                                  .should('be.visible')
                                  .find('path.highcharts-color-0')
                                  .last()
                                  .trigger('mouseover')
                                  .click()
                                  .trigger('mouseenter')
                                  .wait(100)

    // Get the latest Total Approved number and save as @total_approved alias
    cy.get('.highcharts-tooltip').find('text > tspan:nth-child(4)')
                                 .invoke('text').as('total_approved')
    cy.get('@total_approved').then((total_approved) => { cy.log('Total approved: ' + total_approved)})

    // Switch to Amount disbursed chart
    cy.get('.btn').contains('Amount disbursed').click()
    cy.get(".highcharts-graph").first()
                               .trigger('mouseover', {force:true})
                               .click({force:true})
                               .wait(100)
    // Hover the chart to show the tooltip class to get data
    cy.get("g.highcharts-markers").first()
                                  .should('be.visible')
                                  .find('path.highcharts-color-0')
                                  .last().trigger('mouseover')
                                  .click()
                                  .trigger('mouseenter')
                                  .wait(100)
    // Get the latest Total disbured and save as an alias
    cy.get('.highcharts-tooltip').find('text > tspan:nth-child(4)')
                                 .invoke('text').as('total_disbursed')
    cy.get('@total_disbursed').then((total_disbursed) => { cy.log('Total disbursed: ' + total_disbursed)})

    // Switch to Default rate chart
    cy.get('.btn').contains('Default rate').click()
    cy.get(".highcharts-graph").first()
                               .trigger('mouseover', {force:true})
                               .click({force:true})
                               .wait(100)

    // Hover the chart to show the tooltip class to get data
    cy.get("g.highcharts-markers").first()
                                  .should('be.visible')
                                  .find('path.highcharts-color-0')
                                  .last()
                                  .trigger('mouseover')
                                  .click()
                                  .trigger('mouseenter')
                                  .wait(100)
    // Get the latest Default rate and save as an alias
    cy.get('.highcharts-tooltip').find('text > tspan:nth-child(4)')
                                 .invoke('text').as('default_rate')
    cy.get('@default_rate').then((default_rate) => { cy.log('Default Rate: ' + default_rate)})
  })

  it('Repayment tab', () => {
    // Go to the Repayment tab
    cy.get('button').contains('Repayment').click()
    // Hover to the repayment chart to show the tooltip
    cy.get('g.highcharts-series.highcharts-series-0.highcharts-column-series.highcharts-tracker > rect')
      .first()
      .trigger('mouseover')
      .click()
      .wait(100)

    // Get the latest repayment amount and save as an alias
    cy.get('.highcharts-tooltip')
      .find('text > tspan:nth-child(4)')
      .invoke('text').as('repayment')
    cy.get('@repayment').then((repayment) => { cy.log('Total Repayment Amount: ' + repayment)})

    // Hover to the principal amount chart to show the tooltip
    cy.get('g.highcharts-series.highcharts-series-1.highcharts-column-series.highcharts-tracker > rect')
      .first()
      .trigger('mouseover')
      .click()
      .wait(100)
    // Get the latest principal amount and save as an alias
    cy.get('.highcharts-tooltip').find('text > tspan:nth-child(4)')
      .invoke('text').as('principal_amount')
    cy.get('@principal_amount').then((principal_amount) => { cy.log('Principal Amount: ' + principal_amount) })

    // Hover to the interest amount chart to show the tooltip
    cy.get('g.highcharts-series.highcharts-series-2.highcharts-column-series.highcharts-tracker > rect')
      .first()
      .trigger('mouseover')
      .click()
      .wait(100)

    // Get the latest interest amount and save as an alias
    cy.get('.highcharts-tooltip')
      .find('text > tspan:nth-child(4)')
      .invoke('text').as('interest_amount')
    cy.get('@interest_amount').then((interest_amount) => { cy.log('Interest Amount: ' + interest_amount) })
  })

  it('Disbursement tab', () => {
    // Create a variable to store the list of industry percentages
    let industry_percentages = []
    // Go to Disbursement tab
    cy.get('button').contains('Disbursement').click()

    cy.get('g.highcharts-series.highcharts-series-0.highcharts-pie-series.highcharts-tracker').find('path')
      .each(($pie) => 
      {
        // Hover on each piece of the chart to show the tooltip
        cy.wrap($pie).trigger('mouseover', {force:true}).click({force:true}).wait(100)
        // Get the Industry name and corresponding percentage
        cy.get('.highcharts-tooltip').find('text > tspan:nth-child(1)').invoke('text').as('industry')
        cy.get('.highcharts-tooltip').find('text > tspan:nth-child(4)').invoke('text').as('percent')
        cy.then(function () 
        {
          // Create industry/percentage object and push to the list variable
          let object = {}
          object['industry'] = this.industry
          object['percentage'] = parseFloat(this.percent)
          industry_percentages.push(object)
        })
      });
    cy.then(function ()
    {
      // Sort the list of industry percentages by percentage - increasing order
      industry_percentages = _.orderBy(industry_percentages, ['percentage'],['asc'])
      industry_percentages.forEach((item) => {cy.log(item.industry + " : " + item.percentage)})
    })
  })
});