package inmemory

import (
	"iter"
	"sync"

	"github.com/matthiasharzer/go-stats-viewer/view"
)

type View[T any] struct {
	items []T

	mu sync.RWMutex
}

func NewView[T any]() view.View[T] {
	return &View[T]{
		items: make([]T, 0),
		mu:    sync.RWMutex{},
	}
}

func (v *View[T]) Insert(data ...T) error {
	v.mu.Lock()
	defer v.mu.Unlock()

	v.items = append(v.items, data...)

	return nil
}

func (v *View[T]) Update(predicate view.PredicateFn[T], updateFn func(*T) error) error {
	v.mu.Lock()
	defer v.mu.Unlock()

	for i, item := range v.items {
		if predicate(item) {
			err := updateFn(&item)
			if err != nil {
				return err
			}
			v.items[i] = item
			return nil
		}
	}
	return nil
}
func (v *View[T]) Find(predicate view.PredicateFn[T]) (*T, error) {
	v.mu.RLock()
	defer v.mu.RUnlock()

	for _, item := range v.items {
		if predicate(item) {
			return &item, nil
		}
	}
	return nil, nil
}
func (v *View[T]) All() iter.Seq2[T, error] {
	return func(yield func(T, error) bool) {
		v.mu.RLock()
		defer v.mu.RUnlock()

		for _, item := range v.items {
			if !yield(item, nil) {
				break
			}
		}
	}
}

func (v *View[T]) Delete(predicate view.PredicateFn[T]) error {
	v.mu.Lock()
	defer v.mu.Unlock()

	for i, item := range v.items {
		if predicate(item) {
			v.items = append(v.items[:i], v.items[i+1:]...)
			return nil
		}
	}
	return nil
}
func (v *View[T]) DeleteAll() error {
	v.mu.Lock()
	defer v.mu.Unlock()

	v.items = make([]T, 0)
	return nil
}
