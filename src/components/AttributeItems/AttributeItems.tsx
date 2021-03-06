import classNames from 'classnames';
import React from 'react';
import { Attribute, AttributeItem, AttributeType } from '../../types/product.type';
import './AttributeItems.scss';

interface AttributeItemsProps {
  attribute: Attribute;
  onAttributeItemSelect?: (attributeId: string, itemId: string) => void;
  selectedItem?: string;
  small?: boolean;
  selectable?: boolean;
}

interface AttributeItemsState {
  selectedAttribute: AttributeItem | null;
}
export default class AttributeItems extends React.Component<AttributeItemsProps, AttributeItemsState> {
  constructor(props: AttributeItemsProps) {
    super(props);

    this.state = {
      selectedAttribute: null
    };

    this.isItemSelected = this.isItemSelected.bind(this);
  }

  onSelect(item: AttributeItem) {
    if (item.id !== this.state.selectedAttribute?.id && this.props.selectable) {
      if (this.props.onAttributeItemSelect) {
        this.props.onAttributeItemSelect(this.props.attribute.id, item.id);
      }
      this.setState({ selectedAttribute: item });
    }
  }

  isItemSelected(item: AttributeItem) {
    return item.id === this.state.selectedAttribute?.id || item.id === this.props.selectedItem;
  }

  render() {
    const { attribute, selectable, small } = this.props;
    const type = attribute.type;

    return (
      <div className={classNames('attributes', `attributes__${type}`, { [`attributes__${type}-small`]: small })}>
        {attribute.items.map(item => (
          <div
            className={classNames('attributes__item', `${type}Attr`, small ? `${type}Attr__item-small` : `${type}Attr__item`, {
              noSelect: !selectable,
              swatchAttr__border: item.id == 'White',
              [`${type}Attr__item${small ? '-small' : ''}-selected`]: this.isItemSelected(item)
            })}
            key={item.id}
            onClick={() => this.onSelect(item)}
            style={{ background: type == AttributeType.swatch ? item.value : 'auto' }}
          >
            {type === AttributeType.text && item.value}
          </div>
        ))}
      </div>
    );
  }
}
