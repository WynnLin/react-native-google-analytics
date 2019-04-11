import Event from './lib/hits/Event';
import Exception from './lib/hits/Exception';
import PageView from './lib/hits/PageView';
import ScreenView from './lib/hits/ScreenView';
import Social from './lib/hits/Social';
import Timing from './lib/hits/Timing';
import Transaction from './lib/hits/Transaction';
import Item from './lib/hits/Item';
import AddImpression from './lib/hits/Ecommerce/AddImpression';
import AddProduct from './lib/hits/Ecommerce/AddProduct'
import SetAction from './lib/hits/Ecommerce/SetAction'
import _Analytics from './lib/Analytics';
import _Experiment from './lib/Experiment';

export const Hits = {
  Event,
  Exception,
  PageView,
  ScreenView,
  Social,
  Timing,
  Transaction,
  Item
};

export const EcommerceHits = {
  AddImpression,
  AddProduct,
  SetAction
}

export const Analytics = _Analytics;
export const Experiment = _Experiment;
