import { STOIC_QUOTE_URL_RANDOM } from './quotable.constants';
import { StoicQute } from './quotable.interfaces';
import { stoicQuoteService } from './quotable.service';

export const getGandomStoicQuote = async (): Promise<StoicQute | null> => {
  return stoicQuoteService.randomQuote<StoicQute>(STOIC_QUOTE_URL_RANDOM);
};
