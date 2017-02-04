import {groups}         from '../seed/groups';
import {recievedMails}  from '../seed/recievedMails';
import {organizations}  from '../seed/organizations';

export let api = {
  getGroups: function () {
    return groups;
  },
  getRecievedMails: function () {
    return recievedMails;
  },
  getOrganizations: function () {
    return organizations;
  }
};
