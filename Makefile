BUILD_VERSION ?= "unknown"

OUTPUT_NAME := go-stats-viewer
MODULE_NAME := $(shell go list -m)

clean:
	@rm -rf build/

build: clean
	@GOOS=windows GOARCH=amd64 go build -o ./build/$(OUTPUT_NAME)-windows-amd64.exe -ldflags "-X $(MODULE_NAME)/cmd/version.version=$(BUILD_VERSION)" ./main.go
	@GOOS=linux GOARCH=amd64 go build -o ./build/$(OUTPUT_NAME)-linux-amd64 -ldflags "-X $(MODULE_NAME)/cmd/version.version=$(BUILD_VERSION)" ./main.go
	@GOOS=linux GOARCH=arm64 go build -o ./build/$(OUTPUT_NAME)-linux-arm64 -ldflags "-X $(MODULE_NAME)/cmd/version.version=$(BUILD_VERSION)" ./main.go

qa: qa-server qa-ui

test: test-server test-ui

qa-server: analyze-server test-server

analyze-server:
	@go vet
	@go tool staticcheck --checks=all

test-server:
	@go test -failfast -cover ./...

qa-ui: analyze-ui test-ui

analyze-ui: install-ui-dependencies
	@cd ui && npm run analyze

test-ui: install-ui-dependencies
	@cd ui && npm run test

install-ui-dependencies:
	@cd ui && npm ci

.PHONY: clean \
				build \
				qa \
				test \
				qa-server \
				analyze-server \
				test-server \
				qa-ui \
				analyze-ui \
				test-ui \
				install-ui-dependencies
