import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { changeCurrency, selectCurrencies, selectCurrency } from '../../store/reducers/currencyReducer';
import { Currency } from '../../types/product.type';
import './CurrenciesModal.scss';

interface CurrenciesModalProps extends PropsFromRedux {
  open: boolean;
  onClose: () => void;
}

class CurrenciesModal extends React.Component<CurrenciesModalProps> {
  wrapperRef = React.createRef<HTMLDivElement>();

  constructor(props: CurrenciesModalProps) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event: MouseEvent) {
    if (!this.wrapperRef.current) {
      return;
    }

    if (!this.wrapperRef.current.contains(event.target as Node)) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onCurrencySelect(currency: Currency) {
    this.props.changeCurrency(currency);
    this.props.onClose();
  }

  render() {
    const { open, currencies, currency } = this.props;

    return open ? (
      <div className='currenciesModal' ref={this.wrapperRef}>
        {currencies.map(c => (
          <button
            className={`currenciesModal__item ${c.label == currency?.label ? 'currenciesModal__item-selected' : ''}`}
            key={c.label}
            onClick={() => this.onCurrencySelect(c)}
          >
            {c.label} {c.symbol}
          </button>
        ))}
      </div>
    ) : null;
  }
}

const mapStateToProps = (state: RootState) => ({
  currencies: selectCurrencies(state),
  currency: selectCurrency(state)
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changeCurrency: (currency: Currency) => dispatch(changeCurrency(currency))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CurrenciesModal);